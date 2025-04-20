import { AcccountBalanceResponse, ApiResponse } from "./types";

class WalletApi {
    private static readonly BASE_URL = 'https://example.com/api';

    public static readonly ROUTES = {
        ACCOUNT_BALANCE: `${WalletApi.BASE_URL}/account/balance`,
    };

    public static async getAccountBalance() {
        const response: ApiResponse<AcccountBalanceResponse> = await fetch(WalletApi.ROUTES.ACCOUNT_BALANCE, {
            method: 'GET',
        });

        return response;
    }
}

export default WalletApi;
