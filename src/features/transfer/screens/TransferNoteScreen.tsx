import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import ScreenHeader from '@components/ScreenHeader';
import Button from '@components/Button';

const TransferNoteScreen = () => {
    const router = useRouter();

    return (
        <View style={{ flex: 1 }}>
            <ScreenHeader
                title={'Add a note'}
                onBackPress={() => router.back()}
            />
            <Button
                text={'Next'}
                onPress={() => router.push('/transfer/confirmation')}
                style={{ margin: 16 }}
            />
        </View>
    );
}

export default TransferNoteScreen;
