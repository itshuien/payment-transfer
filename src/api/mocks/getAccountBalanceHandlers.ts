import { delay, http, HttpResponse } from 'msw';
import WalletApi from '../WalletApi';
import { AcccountBalanceResponse } from '../types';

const url = WalletApi.ROUTES.ACCOUNT_BALANCE;

const success = http.get(url, async () => {
    await delay();

    return HttpResponse.json<AcccountBalanceResponse>({
        status: 'success',
        message: 'Account balance retrieved successfully',
        data: {
            amount: Math.floor(Math.random() * 10000),
        },
    });
});

export default {
    success,
};
