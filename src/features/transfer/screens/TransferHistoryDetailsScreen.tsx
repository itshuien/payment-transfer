import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ScreenHeader from '@components/ScreenHeader';
import Button from '@components/Button';
import { Ionicons } from '@expo/vector-icons';
import { formatAmount } from '@utils';
import { CURRENT_USER } from 'src/api/mocks/constants';
import InfoTable, { InfoTableRow } from '@components/InfoTable';

type Params = {
    senderName: string;
    senderPhoneNumber: string;
    recipientName: string;
    recipientPhoneNumber: string;
    recipientAvatarUrl: string;
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
        recipientAvatarUrl,
        amount,
        note,
        transactionId,
        createdAt,
    } = useLocalSearchParams<Params>();

    const isOutgoingTransfer = senderPhoneNumber === CURRENT_USER.phoneNumber;

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
                <InfoTable>
                    <InfoTableRow label={'Recipient name'} value={oppositeUser.name} />
                    <InfoTableRow label={'Recipient phone number'} value={oppositeUser.phoneNumber} />
                    <InfoTableRow label={'Note'} value={note ?? ''} />
                    <InfoTableRow label={'Transaction ID'} value={transactionId} />
                    <InfoTableRow label={'Date'} value={new Date(createdAt).toLocaleDateString()} />
                    <InfoTableRow label={'Time'} value={new Date(createdAt).toLocaleTimeString()} />
                </InfoTable>
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
                                        recipientAvatarUrl,
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
        padding: 24,
        justifyContent: 'space-between',
    },
    bodyContent: {
        alignItems: 'center',
        gap: 24,
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
});

export default TransferHistoryDetailsScreen;
