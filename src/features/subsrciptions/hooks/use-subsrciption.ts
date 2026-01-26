import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client"; // adjust the import path

// Hook to fetch the subscription state
export const useSubscription = () => {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const { data } = await authClient.customer.state();
      return data;
    },
  });
};

// Hook to check if the user has an active subscription
export const useHasActiveSubscription = () => {
    const { data: customerState, isLoading, ...rest } = useSubscription();

    const hasActiveSubscription =
        customerState?.activeSubscriptions &&
        customerState.activeSubscriptions.length > 0;

    return {
        hasActiveSubscription,
        subscription: customerState?.activeSubscriptions?.[0],
        isLoading,
        ...rest,
    };
};