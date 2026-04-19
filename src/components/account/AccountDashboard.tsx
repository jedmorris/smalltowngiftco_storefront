"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Package, MapPin, Shield, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import OrderCard from "./OrderCard";
import EditProfileForm from "./EditProfileForm";
import AddressBook from "./AddressBook";
import ChangePasswordForm from "./ChangePasswordForm";
import Button from "@/components/ui/Button";

type Tab = "overview" | "profile" | "addresses" | "security";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: Package },
  { id: "profile", label: "Profile", icon: User },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "security", label: "Security", icon: Shield },
];

export default function AccountDashboard() {
  const { customer, isLoading, isAuthenticated, signOut } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20" role="status" aria-label="Loading">
        <div className="w-8 h-8 border-2 border-apricot-deep border-t-transparent rounded-full animate-spin" />
        <span className="sr-only">Loading</span>
      </div>
    );
  }

  if (!isAuthenticated || !customer) {
    router.push("/account/login");
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="space-y-8">
      {/* Customer Info */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-stucco flex items-center justify-center">
            <User className="w-7 h-7 text-apricot-deep" strokeWidth={1.6} />
          </div>
          <div>
            <h2 className="font-serif text-xl text-ink">
              {customer.firstName} {customer.lastName}
            </h2>
            <p className="text-sm text-ink-muted">{customer.email}</p>
            <p className="text-xs text-ink-subtle mt-0.5">
              Member since{" "}
              {new Date(customer.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={handleSignOut}>
          <LogOut className="w-4 h-4 mr-2" strokeWidth={1.6} />
          Sign Out
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 border-b border-soft overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? "border-apricot-deep text-apricot-deep"
                  : "border-transparent text-ink-muted hover:text-ink hover:border-ink-subtle"
              }`}
            >
              <Icon className="w-4 h-4" strokeWidth={1.6} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-apricot-deep" strokeWidth={1.6} />
            <h3 className="font-serif text-lg text-ink">Order History</h3>
          </div>

          {customer.orders.length === 0 ? (
            <div className="text-center py-12 bg-stucco/30 rounded-xl">
              <Package className="w-10 h-10 text-ink-subtle mx-auto mb-3" strokeWidth={1.6} />
              <p className="text-ink-muted mb-4">No orders yet</p>
              <Button variant="outline" size="sm" onClick={() => router.push("/collections")}>
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {customer.orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "profile" && <EditProfileForm />}

      {activeTab === "addresses" && <AddressBook />}

      {activeTab === "security" && <ChangePasswordForm />}
    </div>
  );
}
