import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ListItem from '@components/ListItem';
import { formatAmount } from '@utils';
import { useRouter } from 'expo-router';
import useTransferHistory from 'src/api/useTransferHistory';

const HomeTransactionHistorySection = () => {
    const router = useRouter();

    const { data: transactions = [] } = useTransferHistory();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recent Transactions</Text>
            {transactions.map((item) => {
                const oppositeUser = item.amount < 0 ? item.sender : item.recipient;

                console.log(item);

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
                                color: item.amount < 0 ? '#ff3333' : '#34bf73',
                            },
                        }}
                        onPress={() => null}
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
