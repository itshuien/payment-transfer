import { delay, http, HttpResponse } from 'msw';
import TransferApi from '../TransferApi';
import { Transaction, TransferHistoryResponse } from '../types';
import { transactionBuilder } from './factories';

const url = TransferApi.ROUTES.TRANSFER_HISTORY;

const success = (transactions?: Transaction[]) => {
    return http.get(url, async () => {
        await delay();

        return HttpResponse.json<TransferHistoryResponse>({
            status: 'success',
            message: 'Transfer history retrieved successfully',
            data: {
                transactions: transactions?.slice(0, 5) ?? transactionBuilder.buildList(5),
            }
        });
    });
};

export default {
    success,
};
