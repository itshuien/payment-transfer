import { useMutation } from "@tanstack/react-query";
import TransferApi from "./TransferApi";
import { TransferRequest, TransferResponse } from "./types";
import { server } from "./mocks/server";
import transferHandlers from "./mocks/transferHandlers";

const useTransferMoney = () => {
    return useMutation<TransferResponse, Error, TransferRequest>({
        mutationFn: async (request) => {
            server.use(transferHandlers.success(request));

            const response = await TransferApi.transfer(request);

            if (!response.ok) {
                throw new Error('Transfer failed');
            }

            const responseJson = await response.json();
            return responseJson;
        },
        onError: (error) => {
            console.error('Error transferring money:', error);
        },
    });
};

export default useTransferMoney;
