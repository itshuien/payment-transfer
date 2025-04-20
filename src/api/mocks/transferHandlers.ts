import { delay, http, HttpResponse } from 'msw';
import TransferApi from '../TransferApi';
import { TransferErrorResponse, TransferRequest, TransferSuccessResponse } from '../types';
import { CURRENT_USER } from './constants';
import { faker } from '@faker-js/faker/.';

const url = TransferApi.ROUTES.TRANSFER;

const success = (request: TransferRequest) => {
    return http.post(url, async () => {
        await delay();

        return HttpResponse.json<TransferSuccessResponse>({
            status: 'success',
            message: 'Transfer successful',
            code: 'success',
            data: {
                transaction: {
                    id: faker.string.alphanumeric(10).toUpperCase(),
                    sender: {
                        name: CURRENT_USER.name,
                        phoneNumber: CURRENT_USER.phoneNumber,
                    },
                    recipient: {
                        name: request.recipient.name,
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

const invalidRecipientError = http.post(url, async () => {
    await delay();

    return HttpResponse.json<TransferErrorResponse>({
        status: 'error',
        message: 'Transfer failed',
        code: 'invalid_recipient',
    }, { status: 400 });
});

const insufficientBalanceError = http.post(url, async () => {
    await delay();

    return HttpResponse.json<TransferErrorResponse>({
        status: 'error',
        message: 'Transfer failed',
        code: 'insufficient_balance',
    }, { status: 400 });
});

const serverError = http.post(url, async () => {
    await delay();

    return HttpResponse.json<TransferErrorResponse>({
        status: 'error',
        message: 'Transfer failed',
        code: 'server',
    }, { status: 500 });
});

const networkError = http.post(url, async () => {
    await delay();

    return HttpResponse.error();
});

export default {
    success,
    invalidRecipientError,
    insufficientBalanceError,
    serverError,
    networkError,
};
