import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { formatAmount } from '@utils';
import useAccountContext from '@features/account/context/useAccountContext';

const HomeAccountBalanceSection = () => {
    const { accountBalance } = useAccountContext();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Account Balance</Text>
            <Text style={styles.amount}>
                {accountBalance ? formatAmount(accountBalance) : 'RM ****'}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 32,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: '#aaa',
        marginBottom: 8,
    },
    amount: {
        fontSize: 40,
        fontWeight: 'bold',
    },
});

export default HomeAccountBalanceSection;
