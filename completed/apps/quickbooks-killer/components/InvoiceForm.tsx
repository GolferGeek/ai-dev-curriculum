"use client";

import { useState } from "react";
import { createInvoiceAction } from "@/lib/actions";

export default function InvoiceForm() {
  const [lineItems, setLineItems] = useState([
    { description: "", amount: "" },
  ]);

  function addLineItem() {
    setLineItems([...lineItems, { description: "", amount: "" }]);
  }

  function removeLineItem(index: number) {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((_, i) => i !== index));
    }
  }

  function updateLineItem(
    index: number,
    field: "description" | "amount",
    value: string
  ) {
    const updated = [...lineItems];
    updated[index][field] = value;
    setLineItems(updated);
  }

  const total = lineItems.reduce(
    (sum, li) => sum + (parseFloat(li.amount) || 0),
    0
  );

  return (
    <form action={createInvoiceAction} className="space-y-6">
      <div>
        <label
          htmlFor="client"
          className="block text-sm font-medium text-gray-700"
        >
          Client Name
        </label>
        <input
          type="text"
          name="client"
          id="client"
          required
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Acme Corp"
        />
      </div>

      <div>
        <label
          htmlFor="due_date"
          className="block text-sm font-medium text-gray-700"
        >
          Due Date
        </label>
        <input
          type="date"
          name="due_date"
          id="due_date"
          required
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Line Items
          </label>
          <button
            type="button"
            onClick={addLineItem}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            + Add Item
          </button>
        </div>

        <div className="space-y-3">
          {lineItems.map((li, i) => (
            <div key={i} className="flex gap-3 items-start">
              <input
                type="text"
                name="li_description"
                required
                value={li.description}
                onChange={(e) =>
                  updateLineItem(i, "description", e.target.value)
                }
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Description"
              />
              <input
                type="number"
                name="li_amount"
                required
                step="0.01"
                min="0"
                value={li.amount}
                onChange={(e) => updateLineItem(i, "amount", e.target.value)}
                className="w-32 rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Amount"
              />
              {lineItems.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLineItem(i)}
                  className="px-3 py-2 text-red-500 hover:text-red-700"
                >
                  X
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-3 text-right text-lg font-semibold text-gray-700">
          Total: ${total.toFixed(2)}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-700 transition-colors"
      >
        Create Invoice
      </button>
    </form>
  );
}
