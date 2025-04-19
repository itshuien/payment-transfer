import { useRouter } from 'expo-router';
import React from 'react';
import AuthenticationScreen from '@features/authentication/screens/AuthenticationScreen';

const TransferAuthenticationScreen = () => {
    const router = useRouter();

    const onSuccess = () => {
        router.push('/transfer/success');
    };

    return <AuthenticationScreen onSuccess={onSuccess} />;
}

export default TransferAuthenticationScreen;
