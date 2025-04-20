import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ScreenHeader from '@components/ScreenHeader';
import Button from '@components/Button';
import { Ionicons } from '@expo/vector-icons';
import { formatAmount } from '@utils';
import { CURRENT_USER } from 'src/api/mocks/constants';

type Params = {
    senderName: string;
    senderPhoneNumber: string;
    recipientName: string;
    recipientPhoneNumber: string;
    amount: string;
    note: string;
    transactionId: string;
    createdAt: string;
}

const TransferHistoryDetailsScreen = () => {
    const router = useRouter();

    const {
        senderName,
        senderPhoneNumber,
        recipientName,
        recipientPhoneNumber,
        amount,
        note,
        transactionId,
        createdAt,
    } = useLocalSearchParams<Params>();

    const isOutgoingTransfer = senderPhoneNumber === CURRENT_USER.phoneNumber;

    const renderTransactionDetailsRow = (label: string, value: string) => (
        <View style={styles.row}>
            <Text style={styles.rowLabel}>{label}</Text>
            <Text style={styles.rowValue}>{value}</Text>
        </View>
    );

    const renderTransactionDetails = () => {
        const oppositeUser = senderPhoneNumber === CURRENT_USER.phoneNumber
            ? { name: recipientName, phoneNumber: recipientPhoneNumber }
            : { name: senderName, phoneNumber: senderPhoneNumber };

        const formattedAmount = formatAmount(Number(amount) * (isOutgoingTransfer ? -1 : 1));

        return (
            <>
                <Text style={styles.amount}>
                    {formattedAmount}
                </Text>
                <View style={styles.divider} />
                <View style={styles.details}>
                    {renderTransactionDetailsRow('Recipient name', oppositeUser.name)}
                    {renderTransactionDetailsRow('Recipient phone number', oppositeUser.phoneNumber)}
                    {renderTransactionDetailsRow('Note', note ?? '')}
                    {renderTransactionDetailsRow('Transaction ID', transactionId)}
                    {renderTransactionDetailsRow('Date', new Date(createdAt).toLocaleDateString())}
                    {renderTransactionDetailsRow('Time', new Date(createdAt).toLocaleTimeString())}
                </View>
            </>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <ScreenHeader
                title={'Transaction Details'}
                onBackPress={() => router.dismissTo('/')}
            />
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <Ionicons
                        name="send"
                        size={72}
                        style={isOutgoingTransfer ? styles.outgoingIcon : styles.incomingIcon}
                    />
                    {renderTransactionDetails()}
                </View>
                {isOutgoingTransfer && (
                    <SafeAreaView>
                        <Button
                            text={'Send again'}
                            onPress={() => {
                                router.push({
                                    pathname: '/transfer/confirmation',
                                    params: {
                                        recipientName,
                                        recipientPhoneNumber,
                                        amount,
                                        note,
                                    },
                                });
                            }}
                        />

                    </SafeAreaView>
                )}
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
        gap: 32,
    },
    outgoingIcon: {
        transform: [{ translateX: 10 }, { rotate: '-45deg' }],
        color: '#198bff',
    },
    incomingIcon: {
        transform: [{ translateX: -10 }, { rotate: '135deg' }],
        color: '#198bff'
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
});

export default TransferHistoryDetailsScreen;
