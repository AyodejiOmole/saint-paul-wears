import { useQuery } from "@tanstack/react-query";

export const useUserOrders = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["userOrders", userId],
    queryFn: async () => {
      if (!userId) return [];
      const res = await fetch(`/api/users/${userId}/orders`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
    enabled: !!userId, // only run when userId is defined
  });
};
