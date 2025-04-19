import { useMutation } from "@tanstack/react-query";
import TransferApi from "./TransferApi";

const useTransferMoney = () => {
    return useMutation({
        mutationFn: async (data: { amount: number; recipientId: string }) => {
            const response = await TransferApi.transfer(data);

            if (!response.ok) {
                throw new Error('Transfer failed');
            }

            const result = await response.json();
            return result;
        },
        onError: (error) => {
            console.error('Error transferring money:', error);
        },
    });
};

export default useTransferMoney;
