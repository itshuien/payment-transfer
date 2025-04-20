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

const TransferProcessingScreen = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { accountBalance } = useAccountContext();
    const { recipient, amount, note, setResponse } = useTransferContext();

    const { mutate: transferMoney, isSuccess, isError } = useTransferMoney();

    useEffect(() => {
        transferMoney({
            recipient,
            amount,
            note,
        }, {
            onSuccess: (response) => {
                // Mock deducting the amount from account balance
                server.use(getAccountBalanceHandlers.success(accountBalance - amount));
                queryClient.invalidateQueries({ queryKey: [WalletApi.ROUTES.ACCOUNT_BALANCE] });

                setResponse(response);
            },
        });
    }, []);

    useEffect(() => {
        if (isSuccess) {
            router.push('/transfer/success');
        } else if (isError) {
            router.push('/transfer/failure');
        }
    }, [isSuccess, isError]);

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
