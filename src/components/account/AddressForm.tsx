"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import type { CustomerAddress } from "@/lib/shopify/types";

interface AddressFormProps {
  address?: CustomerAddress;
  onSave: (address: Omit<CustomerAddress, "id">) => Promise<string | null>;
  onCancel: () => void;
}

export default function AddressForm({ address, onSave, onCancel }: AddressFormProps) {
  const [form, setForm] = useState({
    address1: address?.address1 ?? "",
    address2: address?.address2 ?? "",
    city: address?.city ?? "",
    province: address?.province ?? "",
    zip: address?.zip ?? "",
    country: address?.country ?? "United States",
    phone: address?.phone ?? "",
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const err = await onSave(form);
      if (err) setError(err);
    } finally {
      setSaving(false);
    }
  };

  const update = (key: string, value: string) => setForm({ ...form, [key]: value });
  const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-brand-charcoal mb-1">Address Line 1</label>
        <input type="text" required value={form.address1} onChange={(e) => update("address1", e.target.value)} className={inputClass} placeholder="123 Main St" />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-charcoal mb-1">Address Line 2</label>
        <input type="text" value={form.address2} onChange={(e) => update("address2", e.target.value)} className={inputClass} placeholder="Apt, suite, etc. (optional)" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-brand-charcoal mb-1">City</label>
          <input type="text" required value={form.city} onChange={(e) => update("city", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-charcoal mb-1">State / Province</label>
          <input type="text" required value={form.province} onChange={(e) => update("province", e.target.value)} className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-brand-charcoal mb-1">ZIP / Postal Code</label>
          <input type="text" required value={form.zip} onChange={(e) => update("zip", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-charcoal mb-1">Country</label>
          <input type="text" required value={form.country} onChange={(e) => update("country", e.target.value)} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-charcoal mb-1">Phone (optional)</label>
        <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving...</> : address ? "Update Address" : "Add Address"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
