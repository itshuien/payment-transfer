import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ListItem from '@components/ListItem';
import { formatAmount } from '@utils';
import { useRouter } from 'expo-router';
import useTransferHistory from 'src/api/useTransferHistory';
import { CURRENT_USER } from 'src/api/mocks/constants';
import { Transaction } from 'src/api/types';

const HomeTransactionHistorySection = () => {
    const router = useRouter();

    const { data: transactions = [] } = useTransferHistory();

    const onTransactionPress = (transaction: Transaction) => {
        const oppositeUser = transaction.sender.phoneNumber === CURRENT_USER.phoneNumber
            ? transaction.recipient
            : transaction.sender;

        router.push({
            pathname: '/transfer/history-details',
            params: {
                transactionId: transaction.id,
                senderName: transaction.sender.name,
                senderPhoneNumber: transaction.sender.phoneNumber,
                recipientName: oppositeUser.name,
                recipientPhoneNumber: oppositeUser.phoneNumber,
                recipientAvatarUrl: oppositeUser.avatarUrl,
                amount: transaction.amount,
                note: transaction.note,
                createdAt: transaction.createdAt,
            },
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recent Transactions</Text>
            {transactions.map((item) => {
                const oppositeUser = item.sender.phoneNumber === CURRENT_USER.phoneNumber
                    ? item.recipient
                    : item.sender;

                const isOutgoingTransfer = item.sender.phoneNumber === CURRENT_USER.phoneNumber;

                return (
                    <ListItem
                        key={item.id}
                        leading={{
                            ...oppositeUser.avatarUrl
                                ? { imageUrl: oppositeUser.avatarUrl }
                                : { icon: 'person' },
                        }}
                        text={{
                            primary: oppositeUser.name,
                            secondary: new Date(item.createdAt).toLocaleString(),
                        }}
                        trailing={{
                            text: formatAmount(item.amount),
                            style: {
                                color: isOutgoingTransfer ? '#ff3333' : '#34bf73',
                            },
                        }}
                        onPress={() => onTransactionPress(item)}
                    />
                )
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 16,
        borderRadius: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: 500,
        marginBottom: 8,
        marginHorizontal: 16,
        color: '#999',
    },
});

export default HomeTransactionHistorySection;
