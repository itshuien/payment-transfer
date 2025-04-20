import { ApiResponse, TransferHistoryResponse, TransferRequest, TransferResponse } from "./types";

class TransferApi {
    private static readonly BASE_URL = 'https://example.com/api';

    public static readonly ROUTES = {
        TRANSFER: `${TransferApi.BASE_URL}/transfer`,
        TRANSFER_HISTORY: `${TransferApi.BASE_URL}/transfer/history`,
    };

    public static async transfer(body: TransferRequest) {
        const response: ApiResponse<TransferResponse> = await fetch(TransferApi.ROUTES.TRANSFER, {
            method: 'POST',
            body: JSON.stringify(body),
        });

        return response;
    }

    public static async getTransferHistory() {
        const response: ApiResponse<TransferHistoryResponse> = await fetch(TransferApi.ROUTES.TRANSFER_HISTORY, {
            method: 'GET',
        });

        return response;
    }
}

export default TransferApi;
