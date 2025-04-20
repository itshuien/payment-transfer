import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ListItem from '@components/ListItem';
import { formatAmount } from '@utils';

export const TRANSACTION_HISTORIES = [
    {
        id: 1,
        name: 'John Doe',
        date: new Date('2025-04-20').toLocaleString(),
        amount: -100.00,
    },
    {
        id: 2,
        name: 'Jane Smith',
        date: new Date('2025-04-19').toLocaleString(),
        amount: 200.00,
    },
    {
        id: 3,
        name: 'Bob Johnson',
        date: new Date('2025-04-18').toLocaleString(),
        amount: -50.00,
    },
    {
        id: 4,
        name: 'Alice Brown',
        date: new Date('2025-04-17').toLocaleString(),
        amount: 75.00,
    },
    {
        id: 5,
        name: 'Charlie Davis',
        date: new Date('2025-04-16').toLocaleString(),
        amount: -25.00,
    },
]

const HomeTransactionHistorySection = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recent Transactions</Text>
            {TRANSACTION_HISTORIES.map((item) => (
                <ListItem
                    key={item.id}
                    leading={{ icon: 'person' }}
                    text={{
                        primary: item.name,
                        secondary: item.date,
                    }}
                    trailing={{
                        text: formatAmount(item.amount),
                        style: {
                            color: item.amount < 0 ? '#ff3333' : '#34bf73',
                        },
                    }}
                    onPress={() => null}
                />
            ))}
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
