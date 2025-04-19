import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import ScreenHeader from '@components/ScreenHeader';

const TransferProcessingScreen = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/transfer/success');
        }, 3000);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <ScreenHeader title={'Processing Transfer'} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Transferring money...</Text>
            </View>
        </View>
    );
}

export default TransferProcessingScreen;
