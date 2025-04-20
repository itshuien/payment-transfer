import { ApiResponse, TransferRequest, TransferResponse } from "./types";

class TransferApi {
    private static readonly BASE_URL = 'https://example.com/api';

    public static readonly ROUTES = {
        TRANSFER: `${TransferApi.BASE_URL}/transfer`,
    };

    public static async transfer(body: TransferRequest) {
        const response: ApiResponse<TransferResponse> = await fetch(TransferApi.ROUTES.TRANSFER, {
            method: 'POST',
            body: JSON.stringify(body),
        });

        return response;
    }
}

export default TransferApi;
