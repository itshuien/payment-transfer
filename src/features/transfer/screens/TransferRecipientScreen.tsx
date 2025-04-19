import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import ScreenHeader from '@components/ScreenHeader';
import Button from '@components/Button';

const TransferRecipientScreen = () => {
    const router = useRouter();

    return (
        <View style={{ flex: 1 }}>
            <ScreenHeader
                title={'Select recipient'}
                onBackPress={() => router.back()}
            />
            <Button
                text={'Next'}
                onPress={() => router.push('/transfer/amount')}
                style={{ margin: 16 }}
            />
        </View>
    );
}

export default TransferRecipientScreen;
