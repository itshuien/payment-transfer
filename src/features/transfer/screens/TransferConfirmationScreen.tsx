import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ScreenHeader from '@components/ScreenHeader';
import Button from '@components/Button';
import useTransferContext from '../context/useTransferContext';
import { formatAmount } from '@utils';

const TransferConfirmationScreen = () => {
    const router = useRouter();

    const { recipient, amount, note } = useTransferContext();

    const onConfirmPress = () => {
        router.push('/transfer/authentication');
    };

    const renderTransferDetailsRow = (label: string, value: string) => (
        <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>{label}</Text>
            <Text style={styles.detailsValue}>{value}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <ScreenHeader
                title={'Confirm transfer'}
                onBackPress={() => router.back()}
            />
            <View style={styles.body}>
                <View>
                    <Text style={styles.amount}>
                        {formatAmount(amount)}
                    </Text>
                    <View style={styles.details}>
                        {renderTransferDetailsRow('Recipient', recipient)}
                        {renderTransferDetailsRow('Note', note)}
                        {renderTransferDetailsRow('Date', new Date().toLocaleDateString())}
                        {renderTransferDetailsRow('Transfer Method', 'Instant Transfer')}
                    </View>
                </View>
                <SafeAreaView>
                    <Button
                        text={'Confirm'}
                        onPress={onConfirmPress}
                        style={styles.cta}
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
        padding: 24,
    },
    amount: {
        fontSize: 40,
        fontWeight: '600',
        textAlign: 'center',
    },
    details: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: 'white',
        gap: 16,
        marginTop: 24,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailsLabel: {
        fontSize: 16,
        color: '#888',
    },
    detailsValue: {
        fontSize: 16,
        fontWeight: '500',
    },
    cta: {
        margin: 16,
    },
});

export default TransferConfirmationScreen;
