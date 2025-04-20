import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import ScreenHeader from '@components/ScreenHeader';
import useTransferMoney from 'src/api/useTransferMoney';
import useTransferContext from '../context/useTransferContext';
import { server } from 'src/api/mocks/server';
import getAccountBalanceHandlers from 'src/api/mocks/getAccountBalanceHandlers';
import useAccountContext from '@features/account/context/useAccountContext';
import { useQueryClient } from '@tanstack/react-query';
import WalletApi from 'src/api/WalletApi';
import useTransferHistory from 'src/api/useTransferHistory';
import getTransferHistoryHandlers from 'src/api/mocks/getTransferHistoryHandlers';
import TransferApi from 'src/api/TransferApi';
import { TransferRequest } from 'src/api/types';

const TransferProcessingScreen = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { accountBalance } = useAccountContext();
    const { recipient, amount, note, setResponse } = useTransferContext();

    const { data: transactions = [] } = useTransferHistory();
    const { mutate: transferMoney } = useTransferMoney();

    useEffect(() => {
        const transferRequest: TransferRequest = {
            recipient,
            amount,
            note,
        };

        transferMoney(transferRequest, {
            onSuccess: (response) => {
                // Mock deducting the amount from account balance
                server.use(getAccountBalanceHandlers.success(accountBalance - amount));
                queryClient.invalidateQueries({ queryKey: [WalletApi.ROUTES.ACCOUNT_BALANCE] });

                // Mock adding the transaction to the transfer history
                server.use(getTransferHistoryHandlers.success([response.data.transaction, ...transactions]));
                queryClient.invalidateQueries({ queryKey: [TransferApi.ROUTES.TRANSFER_HISTORY] });

                setResponse(response);

                router.push('/transfer/success');
            },
            onError: (error) => {
                router.push({
                    pathname: '/transfer/failure',
                    params: {
                        errorCode: 'code' in error
                            ? error.code
                            : error.message.includes('Failed to fetch')
                                ? 'network'
                                : 'server'
                    }
                });
            }
        });
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <ScreenHeader title={'Processing Transfer'} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Transferring money...</Text>
            </View>
        </View>
    );
}

export default TransferProcessingScreen;
