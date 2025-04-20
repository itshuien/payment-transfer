import { useQuery } from "@tanstack/react-query";
import TransferApi from "./TransferApi";

const useTransferHistory = () => {
    return useQuery({
        queryKey: [TransferApi.ROUTES.TRANSFER_HISTORY],
        queryFn: async () => {
            const response = await TransferApi.getTransferHistory();

            if (!response.ok) {
                throw new Error('Failed to fetch transfer history');
            }

            const responseJson = await response.json();
            return responseJson.data.transactions;
        },
        refetchOnMount: false,
    });
}

export default useTransferHistory;
