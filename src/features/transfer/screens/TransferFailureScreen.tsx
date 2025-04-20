import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ScreenHeader from '@components/ScreenHeader';
import Button from '@components/Button';
import { Ionicons } from '@expo/vector-icons';
import { TransferErrorResponse } from 'src/api/types';

type TransferErrorCode = TransferErrorResponse['code'] | 'network';

const errorMessages: Record<TransferErrorCode, string> = {
    invalid_recipient: `We couldn't find the recipient's account. Please check the phone number and try again.`,
    insufficient_balance: `You don't have enough balance to complete this transfer.`,
    server: 'Something went wrong. Please try again later.',
    network: 'Check your internet connection and try again.',
};

type Params = {
    errorCode: TransferErrorCode;
}

const TransferFailureScreen = () => {
    const router = useRouter();

    const { errorCode } = useLocalSearchParams<Params>();

    return (
        <View style={{ flex: 1 }}>
            <ScreenHeader title={'Transfer Failed'} />
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <Ionicons name="alert-circle" size={88} color="#ff3333" />
                    <Text style={styles.title}>Oooops!</Text>
                    <Text style={styles.description}>{errorMessages[errorCode]}</Text>
                </View>
                <SafeAreaView style={{ gap: 12 }}>
                    <Button
                        text={'Try again'}
                        onPress={() => router.dismissTo('/transfer/confirmation')}
                    />
                    <Button
                        text={'Close'}
                        onPress={() => router.dismissTo('/')}
                        variant={'secondary'}
                    />
                </SafeAreaView>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        marginBottom: 80,
    },
    title: {
        color: '#ff3333',
        fontSize: 32,
        fontWeight: 600,
    },
    description: {
        color: '#999',
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 16,
    },
});

export default TransferFailureScreen;
