import { useMutation } from "@tanstack/react-query";
import TransferApi from "./TransferApi";
import { TransferErrorResponse, TransferRequest, TransferSuccessResponse } from "./types";
import { server } from "./mocks/server";
import transferHandlers from "./mocks/transferHandlers";

const useTransferMoney = () => {
    return useMutation<TransferSuccessResponse, TransferErrorResponse | Error, TransferRequest>({
        mutationFn: async (request) => {
            /**
             * Override transfer request handlers.
             * Comment out the scenario you want to test.
             */
            server.use(transferHandlers.success(request));
            // server.use(transferHandlers.insufficientBalanceError);
            // server.use(transferHandlers.networkError);
            // server.use(transferHandlers.invalidRecipientError)
            // server.use(transferHandlers.serverError);

            const response = await TransferApi.transfer(request);
            const responseJson = await response.json();

            if (!response.ok || responseJson.status === "error") {
                throw responseJson;
            }

            return responseJson;
        },
    });
};

export default useTransferMoney;
