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
        <h3 className="font-serif text-lg text-brand-charcoal mb-4">Add New Address</h3>
        <AddressForm onSave={handleAdd} onCancel={() => setAdding(false)} />
      </div>
    );
  }

  if (editing) {
    return (
      <div>
        <h3 className="font-serif text-lg text-brand-charcoal mb-4">Edit Address</h3>
        <AddressForm address={editing} onSave={handleUpdate} onCancel={() => setEditing(null)} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg text-brand-charcoal">Saved Addresses</h3>
        <Button variant="outline" size="sm" onClick={() => setAdding(true)}>
          <Plus className="w-4 h-4 mr-1" /> Add Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-12 bg-brand-cream/30 rounded-xl">
          <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">No saved addresses yet</p>
          <Button variant="outline" size="sm" onClick={() => setAdding(true)}>
            Add Your First Address
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map((addr) => {
            const isDefault = addr.id === defaultId;
            return (
              <div key={addr.id} className={`border rounded-xl p-4 ${isDefault ? "border-brand-gold bg-brand-gold/5" : "border-brand-pink/50"}`}>
                <div className="flex items-start justify-between">
                  <div>
                    {isDefault && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-gold mb-1">
                        <Star className="w-3 h-3" fill="currentColor" /> Default
                      </span>
                    )}
                    <p className="text-sm text-brand-charcoal">{addr.address1}</p>
                    {addr.address2 && <p className="text-sm text-gray-500">{addr.address2}</p>}
                    <p className="text-sm text-gray-500">{addr.city}, {addr.province} {addr.zip}</p>
                    <p className="text-sm text-gray-500">{addr.country}</p>
                    {addr.phone && <p className="text-xs text-gray-400 mt-1">{addr.phone}</p>}
                  </div>
                  <div className="flex gap-2">
                    {!isDefault && (
                      <button
                        onClick={() => handleSetDefault(addr.id)}
                        className="text-xs text-gray-400 hover:text-brand-gold transition-colors"
                        title="Set as default"
                      >
                        <Star className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => setEditing(addr)}
                      className="text-xs text-gray-400 hover:text-brand-gold transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(addr.id)}
                      className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
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
