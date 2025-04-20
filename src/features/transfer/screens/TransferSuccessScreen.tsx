import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ScreenHeader from '@components/ScreenHeader';
import Button from '@components/Button';
import { Ionicons } from '@expo/vector-icons';
import useTransferContext from '../context/useTransferContext';
import { TransferSuccessResponse } from 'src/api/types';
import { CONTACTS } from '@features/contacts/constants';
import { formatAmount } from '@utils';

const TransferSuccessScreen = () => {
    const router = useRouter();

    const { response } = useTransferContext();

    const renderTransactionDetailsRow = (label: string, value: string) => (
        <View style={styles.row}>
            <Text style={styles.rowLabel}>{label}</Text>
            <Text style={styles.rowValue}>{value}</Text>
        </View>
    );

    const renderTransactionDetails = (transaction: TransferSuccessResponse['data']['transaction']) => {
        const contact = CONTACTS.find(item => item.phoneNumber === transaction.recipient.phoneNumber);

        return (
            <>
                <Text style={styles.amount}>
                    {formatAmount(transaction.amount)}
                </Text>
                <View style={styles.divider} />
                <View style={styles.details}>
                    {contact && renderTransactionDetailsRow('Recipient name', contact.name)}
                    {renderTransactionDetailsRow('Recipient phone number', transaction.recipient.phoneNumber)}
                    {renderTransactionDetailsRow('Note', transaction.note ?? '')}
                    {renderTransactionDetailsRow('Transaction ID', transaction.id)}
                    {renderTransactionDetailsRow('Date', new Date(transaction.createdAt).toLocaleDateString())}
                    {renderTransactionDetailsRow('Time', new Date(transaction.createdAt).toLocaleTimeString())}
                </View>
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
        padding: 32,
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
    details: {
        width: '100%',
        gap: 24,
        marginTop: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 24,
    },
    rowLabel: {
        flexShrink: 1,
        fontSize: 16,
        color: '#888',
    },
    rowValue: {
        flexShrink: 1,
        fontSize: 16,
        fontWeight: 500,
        textAlign: 'right',
    },
});

export default TransferSuccessScreen;
