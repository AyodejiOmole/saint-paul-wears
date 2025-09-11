"use client";

import { useMutation } from "@tanstack/react-query";

import { Address } from "@/types";

export function useUpdateAddress(userId: string, onSuccess?: () => void) {
  return useMutation({
    mutationFn: async (address: Address) => {
      const res = await fetch(`/api/users/${userId}/address`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(address),
      });
      if (!res.ok) throw new Error("Failed to update address");
      return res.json();
    },
    onSuccess, // pass a callback from your component
  });
}
