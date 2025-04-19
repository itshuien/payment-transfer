import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import ScreenHeader from '@components/ScreenHeader';
import Button from '@components/Button';

const TransferAmountScreen = () => {
    const router = useRouter();

    return (
        <View style={{ flex: 1 }}>
            <ScreenHeader
                title={'Enter amount'}
                onBackPress={() => router.back()}
            />
            <Button
                text={'Next'}
                onPress={() => router.push('/transfer/note')}
                style={{ margin: 16 }}
            />
        </View>
    );
}

export default TransferAmountScreen;
