import { useQuery } from "@tanstack/react-query"
import WalletApi from "./WalletApi"

const useAccountBalance = () => {
    return useQuery({
        queryKey: [WalletApi.ROUTES.ACCOUNT_BALANCE],
        queryFn: async () => {
            const response = await WalletApi.getAccountBalance();

            if (!response.ok) {
                throw new Error('Failed to fetch account balance');
            }

            const responseJson = await response.json();
            return responseJson.data;
        },
        refetchOnMount: false,
    });
};

export default useAccountBalance;
