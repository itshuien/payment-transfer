import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import ScreenHeader from '@components/ScreenHeader';
import Button from '@components/Button';

const TransferConfirmationScreen = () => {
    const router = useRouter();

    return (
        <View style={{ flex: 1 }}>
            <ScreenHeader
                title={'Confirm transfer'}
                onBackPress={() => router.back()}
            />
            <Button
                text={'Confirm'}
                onPress={() => router.push('/transfer/success')}
                style={{ margin: 16 }}
            />
        </View>
    );
}

export default TransferConfirmationScreen;
