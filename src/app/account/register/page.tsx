"use client";

import { useRouter } from "next/navigation";
import RegisterForm from "@/components/account/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <RegisterForm onSuccess={() => router.push("/account")} />
    </div>
  );
}
