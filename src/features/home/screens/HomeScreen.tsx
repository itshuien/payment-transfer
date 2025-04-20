import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import ScreenHeader from '@components/ScreenHeader';
import Button from '@components/Button';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeAccountBalanceSection from '../components/HomeAccountBalanceSection';
import HomeTransactionHistorySection from '../components/HomeTransactionHistorySection';

const HomeScreen = () => {
    const router = useRouter();

    const { bottom } = useSafeAreaInsets();

    return (
        <View style={{ flex: 1 }}>
            <ScreenHeader title="Home" />
            <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent} scrollIndicatorInsets={{ top: 1 }}>
                <HomeAccountBalanceSection />
                <Button
                    text={'Send money'}
                    onPress={() => router.push('/transfer')}
                    style={styles.actionButton}
                />
                <HomeTransactionHistorySection />
                <View style={{ paddingBottom: bottom }} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingHorizontal: 24,
    },
    bodyContent: {
        gap: 16,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 12,
    },
});

export default HomeScreen;
