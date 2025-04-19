import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import ScreenHeader from '@components/ScreenHeader';
import Button from '@components/Button';

const TransferSuccessScreen = () => {
    const router = useRouter();

    return (
        <View style={{ flex: 1 }}>
            <ScreenHeader title={'Transfer Failed'} />
            <Button
                text={'Close'}
                onPress={() => router.dismissTo('/')}
                style={{ margin: 16 }}
            />
        </View>
    );
}

export default TransferSuccessScreen;
