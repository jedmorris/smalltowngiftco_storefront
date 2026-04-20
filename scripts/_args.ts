export interface ParsedArgs {
  commit: boolean;
  dryRun: boolean;
  limit?: number;
  collection?: string;
  verbose: boolean;
  rest: string[];
}

export function parseArgs(argv: string[]): ParsedArgs {
  const out: ParsedArgs = {
    commit: false,
    dryRun: true,
    verbose: false,
    rest: [],
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--commit") {
      out.commit = true;
      out.dryRun = false;
    } else if (a === "--dry-run") {
      out.dryRun = true;
      out.commit = false;
    } else if (a === "--limit") {
      out.limit = Number(argv[++i]);
    } else if (a === "--collection") {
      out.collection = argv[++i];
    } else if (a === "--verbose" || a === "-v") {
      out.verbose = true;
    } else {
      out.rest.push(a);
    }
  }
  return out;
}
