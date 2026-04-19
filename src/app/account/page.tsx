import type { Metadata } from "next";
import AccountDashboard from "@/components/account/AccountDashboard";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your Small Town Gift Co. account and view order history.",
};

export default function AccountPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-serif text-3xl lg:text-4xl text-ink mb-8">
        My Account
      </h1>
      <AccountDashboard />
    </div>
  );
}
