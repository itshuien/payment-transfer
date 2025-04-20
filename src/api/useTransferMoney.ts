import { useMutation } from "@tanstack/react-query";
import TransferApi from "./TransferApi";
import { TransferErrorResponse, TransferRequest, TransferSuccessResponse } from "./types";
import { server } from "./mocks/server";
import transferHandlers from "./mocks/transferHandlers";
import { HttpHandler } from "msw";

const useTransferMoney = () => {
    return useMutation<TransferSuccessResponse, TransferErrorResponse | Error, TransferRequest>({
        mutationFn: async (request) => {
            /**
             * Override transfer request handlers.
             * Request handler is selected based on the request amount.
             */
            const scenarios: Record<string, HttpHandler> = {
                '0.01': transferHandlers.success(request),
                '0.02': transferHandlers.invalidRecipientError,
                '0.03': transferHandlers.insufficientBalanceError,
                '0.04': transferHandlers.serverError,
                '0.05': transferHandlers.networkError,
            };
            const requestHandler = scenarios[request.amount.toString()] ?? transferHandlers.success(request);
            server.use(requestHandler);

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
