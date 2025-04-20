import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ScreenHeader from '@components/ScreenHeader';
import Button from '@components/Button';
import NumericKeyboard from '@components/NumericKeyboard';
import useTransferContext from '../context/useTransferContext';
import { formatAmount } from '@utils';
import useAccountContext from '@features/account/context/useAccountContext';

const TransferAmountScreen = () => {
    const router = useRouter();

    const { accountBalance } = useAccountContext();

    const { setAmount } = useTransferContext();

    const [rawAmount, setRawAmount] = useState('');

    const amount = useMemo(() => {
        const padded = (rawAmount || '0').padStart(3, '0');
        const dollars = padded.slice(0, -2);
        const cents = padded.slice(-2);

        return Number(`${dollars}.${cents}`);
    }, [rawAmount]);

    const isValidAmount = useMemo(() => {
        if (!accountBalance) return false;
        return amount > 0 && amount <= accountBalance;
    }, [amount]);

    const onKeyPress = (key: string) => {
        setRawAmount((prev) => prev + key);
    };

    const onBackspacePress = () => {
        setRawAmount((prev) => prev.slice(0, -1));
    };

    const onNextPress = () => {
        setAmount(amount);
        router.push('/transfer/note');
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
                    {accountBalance && (
                        <Text style={{ color: amount <= accountBalance ? '#888' : 'red' }}>
                            Account balance: {formatAmount(accountBalance)}
                        </Text>
                    )}
                </View>
                <SafeAreaView>
                    <NumericKeyboard
                        onKeyPress={onKeyPress}
                        onBackspacePress={onBackspacePress}
                    />
                    <Button
                        text={'Next'}
                        onPress={onNextPress}
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
