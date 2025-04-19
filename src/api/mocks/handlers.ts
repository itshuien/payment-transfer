import { delay, http, HttpResponse } from 'msw';
import TransferApi from '../TransferApi';

export const handlers = [
    http.post(TransferApi.ROUTES.TRANSFER, async () => {
        await delay(3000);

        return HttpResponse.json({
            status: 'success',
            message: 'Transfer successful',
            data: {
                amount: 10,
                recipient: 'Alice',
                transactionId: '1234567890',
            },
        });
    }),
];
