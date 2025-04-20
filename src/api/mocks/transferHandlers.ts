import { delay, http, HttpResponse } from 'msw';
import TransferApi from '../TransferApi';
import { TransferRequest, TransferResponse } from '../types';

const url = TransferApi.ROUTES.TRANSFER;

const success = (request: TransferRequest) => {
    return http.post(url, async () => {
        await delay();

        return HttpResponse.json<TransferResponse>({
            status: 'success',
            message: 'Transfer successful',
            data: {
                transaction: {
                    id: '1234567890',
                    sender: {
                        phoneNumber: '1234567890',
                    },
                    recipient: {
                        phoneNumber: request.recipient.phoneNumber,
                    },
                    amount: request.amount,
                    note: request.note,
                    status: 'completed',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            },
        });
    })
};

const error = http.post(url, async () => {
    await delay();

    return HttpResponse.json(null, { status: 500 });
})

export default {
    success,
    error,
};
