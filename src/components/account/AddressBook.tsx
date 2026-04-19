"use client";

import { useState } from "react";
import { MapPin, Plus, Trash2, Star } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import {
  createCustomerAddress,
  updateCustomerAddress,
  deleteCustomerAddress,
  setDefaultCustomerAddress,
} from "@/lib/shopify";
import AddressForm from "./AddressForm";
import Button from "@/components/ui/Button";
import type { CustomerAddress } from "@/lib/shopify/types";

export default function AddressBook() {
  const { customer, accessToken, refreshCustomer } = useAuth();
  const [editing, setEditing] = useState<CustomerAddress | null>(null);
  const [adding, setAdding] = useState(false);

  const addresses = customer?.addresses ?? [];
  const defaultId = customer?.defaultAddress?.id;

  const handleAdd = async (address: Omit<CustomerAddress, "id">) => {
    if (!accessToken) return "Not authenticated";
    const { error } = await createCustomerAddress(accessToken, address);
    if (error) { toast.error(error); return error; }
    await refreshCustomer();
    setAdding(false);
    toast.success("Address added");
    return null;
  };

  const handleUpdate = async (address: Omit<CustomerAddress, "id">) => {
    if (!accessToken || !editing) return "Not authenticated";
    const { error } = await updateCustomerAddress(accessToken, editing.id, address);
    if (error) { toast.error(error); return error; }
    await refreshCustomer();
    setEditing(null);
    toast.success("Address updated");
    return null;
  };

  const handleDelete = async (id: string) => {
    if (!accessToken) return;
    await deleteCustomerAddress(accessToken, id);
    await refreshCustomer();
    toast.success("Address deleted");
  };

  const handleSetDefault = async (id: string) => {
    if (!accessToken) return;
    await setDefaultCustomerAddress(accessToken, id);
    await refreshCustomer();
    toast.success("Default address updated");
  };

  if (adding) {
    return (
      <div>
        <h3 className="font-serif text-lg text-ink mb-4">Add New Address</h3>
        <AddressForm onSave={handleAdd} onCancel={() => setAdding(false)} />
      </div>
    );
  }

  if (editing) {
    return (
      <div>
        <h3 className="font-serif text-lg text-ink mb-4">Edit Address</h3>
        <AddressForm address={editing} onSave={handleUpdate} onCancel={() => setEditing(null)} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg text-ink">Saved Addresses</h3>
        <Button variant="outline" size="sm" onClick={() => setAdding(true)}>
          <Plus className="w-4 h-4 mr-1" strokeWidth={1.6} /> Add Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-12 bg-stucco/30 rounded-xl">
          <MapPin className="w-10 h-10 text-ink-subtle mx-auto mb-3" strokeWidth={1.6} />
          <p className="text-ink-muted mb-4">No saved addresses yet</p>
          <Button variant="outline" size="sm" onClick={() => setAdding(true)}>
            Add Your First Address
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map((addr) => {
            const isDefault = addr.id === defaultId;
            return (
              <div key={addr.id} className={`border rounded-xl p-4 ${isDefault ? "border-apricot-deep bg-apricot-deep/5" : "border-soft"}`}>
                <div className="flex items-start justify-between">
                  <div>
                    {isDefault && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-apricot-deep mb-1">
                        <Star className="w-3 h-3" fill="currentColor" strokeWidth={1.6} /> Default
                      </span>
                    )}
                    <p className="text-sm text-ink">{addr.address1}</p>
                    {addr.address2 && <p className="text-sm text-ink-muted">{addr.address2}</p>}
                    <p className="text-sm text-ink-muted">{addr.city}, {addr.province} {addr.zip}</p>
                    <p className="text-sm text-ink-muted">{addr.country}</p>
                    {addr.phone && <p className="text-xs text-ink-subtle mt-1">{addr.phone}</p>}
                  </div>
                  <div className="flex gap-2">
                    {!isDefault && (
                      <button
                        onClick={() => handleSetDefault(addr.id)}
                        className="text-xs text-ink-subtle hover:text-apricot-deep transition-colors"
                        title="Set as default"
                      >
                        <Star className="w-4 h-4" strokeWidth={1.6} />
                      </button>
                    )}
                    <button
                      onClick={() => setEditing(addr)}
                      className="text-xs text-ink-subtle hover:text-apricot-deep transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(addr.id)}
                      className="text-xs text-ink-subtle hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={1.6} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
