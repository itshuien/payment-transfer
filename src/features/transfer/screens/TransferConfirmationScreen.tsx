import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import ScreenHeader from '@components/ScreenHeader';
import Button from '@components/Button';

const TransferConfirmationScreen = () => {
    const router = useRouter();

    const onConfirmPress = () => {
        router.push('/transfer/authentication');
    };

    return (
        <View style={{ flex: 1 }}>
            <ScreenHeader
                title={'Confirm transfer'}
                onBackPress={() => router.back()}
            />
            <Button
                text={'Confirm'}
                onPress={onConfirmPress}
                style={{ margin: 16 }}
            />
        </View>
    );
}

export default TransferConfirmationScreen;
