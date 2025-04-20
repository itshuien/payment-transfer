import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import ScreenHeader from '@components/ScreenHeader';
import useTransferMoney from 'src/api/useTransferMoney';
import useTransferContext from '../context/useTransferContext';

const TransferProcessingScreen = () => {
    const router = useRouter();

    const { recipient, amount, note, setResponse } = useTransferContext();

    const { mutate: transferMoney, isSuccess, isError } = useTransferMoney();

    useEffect(() => {
        transferMoney({
            recipient,
            amount,
            note,
        }, {
            onSuccess: setResponse,
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
