"use client";

import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { updateCustomer } from "@/lib/shopify";
import Button from "@/components/ui/Button";

export default function EditProfileForm() {
  const { customer, accessToken, refreshCustomer } = useAuth();
  const [firstName, setFirstName] = useState(customer?.firstName ?? "");
  const [lastName, setLastName] = useState(customer?.lastName ?? "");
  const [phone, setPhone] = useState(customer?.phone ?? "");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;
    setError(null);
    setSuccess(false);
    setSaving(true);
    try {
      const { error: err } = await updateCustomer(accessToken, { firstName, lastName, phone: phone || undefined });
      if (err) {
        setError(err);
        toast.error(err);
      } else {
        await refreshCustomer();
        setSuccess(true);
        toast.success("Profile updated");
        setTimeout(() => setSuccess(false), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>
      )}
      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> Profile updated successfully
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-brand-charcoal mb-1">Email</label>
        <input type="email" value={customer?.email ?? ""} disabled className={`${inputClass} bg-gray-50 text-gray-400 cursor-not-allowed`} />
        <p className="text-xs text-gray-400 mt-1">Email cannot be changed here</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="editFirst" className="block text-sm font-medium text-brand-charcoal mb-1">First Name</label>
          <input id="editFirst" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label htmlFor="editLast" className="block text-sm font-medium text-brand-charcoal mb-1">Last Name</label>
          <input id="editLast" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="editPhone" className="block text-sm font-medium text-brand-charcoal mb-1">Phone</label>
        <input id="editPhone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="(555) 123-4567" />
      </div>

      <Button type="submit" disabled={saving}>
        {saving ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving...</> : "Save Changes"}
      </Button>
    </form>
  );
}
