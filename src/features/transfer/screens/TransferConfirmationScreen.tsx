import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ScreenHeader from '@components/ScreenHeader';
import Button from '@components/Button';
import useTransferContext from '../context/useTransferContext';
import { formatAmount } from '@utils';
import { Ionicons } from '@expo/vector-icons';
import useAccountContext from '@features/account/context/useAccountContext';

const TransferConfirmationScreen = () => {
    const router = useRouter();

    const { accountBalance } = useAccountContext();
    const { recipient, amount, note } = useTransferContext();

    const isInsufficientBalance = Number(amount) > accountBalance;

    const onConfirmPress = () => {
        router.push('/transfer/authentication');
    };

    const renderTransactionDetailsRow = (label: string, value: string) => (
        <View style={styles.row}>
            <Text style={styles.rowLabel}>{label}</Text>
            <Text style={styles.rowValue}>{value}</Text>
        </View>
    );

    const renderTransactionDetails = () => {
        const formattedAmount = formatAmount(Number(amount));

        return (
            <>
                <View>
                    <Text style={styles.amount}>
                        {formattedAmount}
                    </Text>
                    {isInsufficientBalance && (
                        <Text style={styles.insufficientBalanceText}>
                            Account balance: {formatAmount(accountBalance)}
                        </Text>
                    )}
                </View>
                <View style={styles.divider} />
                <View style={styles.details}>
                    {renderTransactionDetailsRow('Recipient name', recipient.name)}
                    {renderTransactionDetailsRow('Recipient phone number', recipient.phoneNumber)}
                    {renderTransactionDetailsRow('Note', note ?? '')}
                    {renderTransactionDetailsRow('Date', new Date().toLocaleDateString())}
                    {renderTransactionDetailsRow('Time', new Date().toLocaleTimeString())}
                    {renderTransactionDetailsRow('Service Fee', formatAmount(0))}
                </View>
            </>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <ScreenHeader
                title={'Confirm transfer'}
                onBackPress={() => router.back()}
            />
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="swap-horizontal" size={32} />
                    </View>
                    {renderTransactionDetails()}
                </View>
                <SafeAreaView style={styles.footerContainer}>
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>{formatAmount(amount)}</Text>
                    </View>
                    <Button
                        text={'Confirm'}
                        onPress={onConfirmPress}
                        style={{ flex: 1 }}
                        disabled={isInsufficientBalance}
                    />
                </SafeAreaView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 32,
    },
    bodyContent: {
        alignItems: 'center',
        gap: 32,
    },
    iconContainer: {
        padding: 16,
        borderRadius: '50%',
        backgroundColor: '#ddd',
    },
    amount: {
        fontSize: 32,
        fontWeight: 700,
    },
    insufficientBalanceText: {
        color: '#ff3333',
        textAlign: 'center',
        marginTop: 8,
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
        flexGrow: 1,
        flexShrink: 0,
        fontSize: 16,
        color: '#888',
    },
    rowValue: {
        flexShrink: 1,
        fontSize: 16,
        fontWeight: 500,
        textAlign: 'right',
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 16,
    },
    totalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        gap: 8,
    },
    totalLabel: {
        fontSize: 16,
        color: '#999',
    },
    totalValue: {
        fontSize: 20,
        fontWeight: 500,
    },
});

export default TransferConfirmationScreen;
