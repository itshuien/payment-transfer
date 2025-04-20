import { useMutation } from "@tanstack/react-query";
import TransferApi from "./TransferApi";
import { TransferRequest, TransferResponse } from "./types";
import { server } from "./mocks/server";
import transferHandlers from "./mocks/transferHandlers";

const useTransferMoney = () => {
    return useMutation<TransferResponse, Error, TransferRequest>({
        mutationFn: async (request) => {
            /**
             * Override transfer request handlers.
             * Comment out the scenario you want to test.
             */
            server.use(transferHandlers.success(request));
            // server.use(transferHandlers.error);

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
