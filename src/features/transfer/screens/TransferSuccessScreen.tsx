import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ScreenHeader from '@components/ScreenHeader';
import Button from '@components/Button';
import { Ionicons } from '@expo/vector-icons';
import useTransferContext from '../context/useTransferContext';
import { TransferSuccessResponse } from 'src/api/types';
import { formatAmount } from '@utils';
import InfoTable, { InfoTableRow } from '@components/InfoTable';

const TransferSuccessScreen = () => {
    const router = useRouter();

    const { response } = useTransferContext();

    const renderTransactionDetails = (transaction: TransferSuccessResponse['data']['transaction']) => {
        const { recipient } = transaction;

        return (
            <>
                <Text style={styles.amount}>
                    {formatAmount(transaction.amount)}
                </Text>
                <View style={styles.divider} />
                <InfoTable>
                    <InfoTableRow label={'Recipient name'} value={recipient.name} />
                    <InfoTableRow label={'Recipient phone number'} value={recipient.phoneNumber} />
                    <InfoTableRow label={'Note'} value={transaction.note ?? ''} />
                    <InfoTableRow label={'Transaction ID'} value={transaction.id} />
                    <InfoTableRow label={'Date'} value={new Date(transaction.createdAt).toLocaleDateString()} />
                    <InfoTableRow label={'Time'} value={new Date(transaction.createdAt).toLocaleTimeString()} />
                </InfoTable>
            </>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <ScreenHeader title={'Transfer Successful'} />
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <Ionicons name="checkmark-circle" size={88} color="#34bf73" />
                    {response && renderTransactionDetails(response.data.transaction)}
                </View>
                <SafeAreaView>
                    <Button
                        text={'Close'}
                        onPress={() => router.dismissTo('/')}
                    />
                </SafeAreaView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
    },
    bodyContent: {
        alignItems: 'center',
        gap: 24,
    },
    amount: {
        fontSize: 32,
        fontWeight: 700,
    },
    divider: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'dashed',
        width: '100%',
    },
});

export default TransferSuccessScreen;
