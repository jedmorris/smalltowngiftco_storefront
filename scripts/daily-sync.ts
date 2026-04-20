import "./_bootstrap";

import { spawn } from "node:child_process";
import { appendFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Orchestrator — daily Printify → Shopify sync.
 *
 * Runs the idempotent replicate/publish/assign pipeline end-to-end, hits
 * /api/revalidate on Vercel, appends a timestamped summary to
 * .tmp/daily-sync.log. Designed to be invoked by a Claude Code scheduled task
 * at 2 AM PT (`smalltowngiftco-daily-sync`) or manually via `npm run sync:daily`.
 *
 * Failures in individual pipeline steps are logged and do NOT abort the run —
 * revalidate still runs so the frontend picks up any partial success.
 */

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const logDir = `${projectRoot}/.tmp`;
const logPath = `${logDir}/daily-sync.log`;

if (!existsSync(logDir)) mkdirSync(logDir, { recursive: true });

function formatTs(d: Date): string {
  return d.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function log(msg: string): void {
  const line = msg.endsWith("\n") ? msg : msg + "\n";
  process.stdout.write(line);
  appendFileSync(logPath, line);
}

interface StepResult {
  name: string;
  exitCode: number;
  durationMs: number;
  stdout: string;
  stderr: string;
}

function runStep(name: string, command: string, envOverrides: Record<string, string> = {}): Promise<StepResult> {
  return new Promise((resolve) => {
    const start = Date.now();
    log(`\n── ${name} ──`);
    log(`$ ${command}`);

    const child = spawn("sh", ["-c", command], {
      cwd: projectRoot,
      env: { ...process.env, ...envOverrides } as NodeJS.ProcessEnv,
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk: Buffer) => {
      const s = chunk.toString();
      stdout += s;
      process.stdout.write(s);
      appendFileSync(logPath, s);
    });

    child.stderr.on("data", (chunk: Buffer) => {
      const s = chunk.toString();
      stderr += s;
      process.stderr.write(s);
      appendFileSync(logPath, s);
    });

    child.on("close", (code) => {
      resolve({
        name,
        exitCode: code ?? -1,
        durationMs: Date.now() - start,
        stdout,
        stderr,
      });
    });
  });
}

async function revalidate(topic: string): Promise<{ status: number; body: string }> {
  const secret = process.env.SHOPIFY_REVALIDATION_SECRET;
  if (!secret) {
    return { status: 0, body: "SHOPIFY_REVALIDATION_SECRET not set" };
  }
  // Use VERCEL_DEPLOYMENT_URL if set (Vercel-hosted Next.js app), else fall back
  // to NEXT_PUBLIC_SITE_URL, else the default vercel.app domain.
  // Note: smalltowngiftco.com (apex) currently points to Wix, NOT the Next.js app,
  // so we can't use NEXT_PUBLIC_SITE_URL as the revalidate target unless the user
  // sets it explicitly to the Vercel URL.
  const base =
    process.env.VERCEL_DEPLOYMENT_URL ??
    "https://smalltowngiftco.vercel.app";
  const url = `${base.replace(/\/$/, "")}/api/revalidate`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "x-shopify-hmac-sha256": secret,
        "x-shopify-topic": topic,
        "content-type": "application/json",
      },
      body: "{}",
    });
    const body = await res.text();
    return { status: res.status, body: body.slice(0, 200) };
  } catch (err) {
    return { status: -1, body: String(err).slice(0, 200) };
  }
}

function extractTotals(stdout: string): string {
  // Best-effort summary parsing of each step's trailing "Done. …" line.
  const lines = stdout.trim().split("\n");
  for (let i = lines.length - 1; i >= Math.max(0, lines.length - 6); i--) {
    const line = lines[i].trim();
    if (line.startsWith("Done.") || line.startsWith("Created:") || line.startsWith("Published:") || line.startsWith("Assigned:")) {
      return line;
    }
  }
  return "(no summary line found)";
}

async function main() {
  const startTs = new Date();
  log(`\n========================================`);
  log(`=== Daily sync — ${formatTs(startTs)} PT ===`);
  log(`========================================`);

  const env: Record<string, string> = { PRINTIFY_MIN_GAP_MS: "1500" };
  const steps: StepResult[] = [];

  steps.push(await runStep("[1/3] Replicate new Printify products to Shopify-shop", "npm run printify:replicate -- --commit", env));
  steps.push(await runStep("[2/3] Publish Printify → Shopify", "npm run printify:publish -- --commit", env));
  steps.push(await runStep("[3/3] Assign products to collections", "npm run shopify:assign-collections -- --commit", env));

  log(`\n── Revalidate Vercel cache ──`);
  const r1 = await revalidate("products/update");
  log(`  products/update → ${r1.status} ${r1.body}`);
  const r2 = await revalidate("collections/update");
  log(`  collections/update → ${r2.status} ${r2.body}`);

  const endTs = new Date();
  const totalMin = Math.round((endTs.getTime() - startTs.getTime()) / 60000);

  log(`\n── Summary ──`);
  for (const s of steps) {
    const min = Math.round(s.durationMs / 60000);
    const status = s.exitCode === 0 ? "OK" : `FAIL(${s.exitCode})`;
    log(`  ${status.padEnd(8)} ${s.name}  [${min}m]`);
    log(`           ${extractTotals(s.stdout)}`);
  }
  log(`  Revalidate products=${r1.status}, collections=${r2.status}`);
  log(`\nTotal: ${totalMin}m @ ${formatTs(endTs)} PT`);
  log(``);

  const anyFail = steps.some((s) => s.exitCode !== 0);
  process.exit(anyFail ? 1 : 0);
}

main().catch((err) => {
  log(`\nFATAL: ${String(err)}`);
  process.exit(1);
});
