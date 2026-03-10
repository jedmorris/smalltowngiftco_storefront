"use client";

import { useRouter } from "next/navigation";
import LoginForm from "@/components/account/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <LoginForm onSuccess={() => router.push("/account")} />
    </div>
  );
}
