import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ScreenHeader from '@components/ScreenHeader';
import Button from '@components/Button';
import NumericKeyboard from '@components/NumericKeyboard';

// TODO: Replace with actual account balance
const accountBalance = 1000;

const formatAmount = (amount: number) => {
    return amount.toLocaleString('en-MY', {
        style: 'currency',
        currency: 'MYR',
    });
}

const TransferAmountScreen = () => {
    const router = useRouter();

    const [rawAmount, setRawAmount] = useState('');

    const amount = useMemo(() => {
        const padded = (rawAmount || '0').padStart(3, '0');
        const dollars = padded.slice(0, -2);
        const cents = padded.slice(-2);

        return Number(`${dollars}.${cents}`);
    }, [rawAmount]);

    const isValidAmount = useMemo(() => {
        return amount > 0 && amount <= accountBalance;
    }, [amount]);

    const onKeyPress = (key: string) => {
        setRawAmount((prev) => prev + key);
    };

    const onBackspacePress = () => {
        setRawAmount((prev) => prev.slice(0, -1));
    };

    return (
        <View style={{ flex: 1 }}>
            <ScreenHeader
                title={'Enter amount'}
                onBackPress={() => router.back()}
            />
            <View style={styles.body}>
                <View style={styles.amountSection}>
                    <Text style={[styles.amountText, { color: amount > 0 ? 'black' : '#888' }]}>
                        {formatAmount(amount)}
                    </Text>
                    <Text style={{ color: amount <= accountBalance ? '#888' : 'red' }}>
                        Account balance: {formatAmount(accountBalance)}
                    </Text>
                </View>
                <SafeAreaView>
                    <NumericKeyboard
                        onKeyPress={onKeyPress}
                        onBackspacePress={onBackspacePress}
                    />
                    <Button
                        text={'Next'}
                        onPress={() => router.push('/transfer/note')}
                        style={styles.cta}
                        disabled={!isValidAmount}
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
        padding: 16,
    },
    amountSection: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    amountText: {
        fontSize: 40,
        fontWeight: '600',
        color: 'black',
    },
    cta: {
        margin: 16,
    },
});

export default TransferAmountScreen;
