"use client";

import { useState } from "react";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { customerSignIn, updateCustomer } from "@/lib/shopify";
import Button from "@/components/ui/Button";

export default function ChangePasswordForm() {
  const { customer, accessToken } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    if (newPassword.length < 5) {
      setError("New password must be at least 5 characters");
      return;
    }
    if (!customer?.email || !accessToken) return;

    setSaving(true);
    try {
      // Verify current password by signing in
      const { error: signInErr } = await customerSignIn(customer.email, currentPassword);
      if (signInErr) {
        setError("Current password is incorrect");
        return;
      }

      // Update password via customer update
      const { error: updateErr } = await updateCustomer(accessToken, { password: newPassword } as Parameters<typeof updateCustomer>[1]);
      if (updateErr) {
        setError(updateErr);
        return;
      }

      setSuccess(true);
      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setSuccess(false), 5000);
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div className="p-3 bg-brand-cream/50 rounded-lg flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
        <p className="text-xs text-gray-500">Changing your password will sign you out of other devices.</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>
      )}
      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> Password updated successfully
        </div>
      )}

      <div>
        <label htmlFor="currentPw" className="block text-sm font-medium text-brand-charcoal mb-1">Current Password</label>
        <input id="currentPw" type="password" required value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className={inputClass} />
      </div>

      <div>
        <label htmlFor="newPw" className="block text-sm font-medium text-brand-charcoal mb-1">New Password</label>
        <input id="newPw" type="password" required minLength={5} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={inputClass} placeholder="At least 5 characters" />
      </div>

      <div>
        <label htmlFor="confirmPw" className="block text-sm font-medium text-brand-charcoal mb-1">Confirm New Password</label>
        <input id="confirmPw" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputClass} />
      </div>

      <Button type="submit" disabled={saving}>
        {saving ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Updating...</> : "Update Password"}
      </Button>
    </form>
  );
}
