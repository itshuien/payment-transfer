class TransferApi {
    private static readonly BASE_URL = 'https://example.com/api';

    public static readonly ROUTES = {
        TRANSFER: `${TransferApi.BASE_URL}/transfer`,
    };

    public static async transfer(data: { amount: number; recipientId: string }) {
        const response = await fetch(TransferApi.ROUTES.TRANSFER, {
            method: 'POST',
            body: JSON.stringify(data),
        });

        return response;
    }
}

export default TransferApi;
