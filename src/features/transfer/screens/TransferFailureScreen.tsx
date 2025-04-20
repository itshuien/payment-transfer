import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ScreenHeader from '@components/ScreenHeader';
import Button from '@components/Button';
import { Ionicons } from '@expo/vector-icons';

const TransferFailureScreen = () => {
    const router = useRouter();

    return (
        <View style={{ flex: 1 }}>
            <ScreenHeader title={'Transfer Failed'} />
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <Ionicons name="alert-circle" size={88} color="#ff3333" />
                    <Text style={styles.title}>Oooops!</Text>
                    <Text style={styles.description}>Something went wrong.</Text>
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
        color: '#aaa',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default TransferFailureScreen;
