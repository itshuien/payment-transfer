import * as LocalAuthentication from 'expo-local-authentication';
import { ActivityIndicator, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AuthenticationPinScreen from './AuthenticationPinScreen';

interface Props {
    onSuccess: () => void;
}

const AuthenticationScreen: React.FC<Props> = (props) => {
    const { onSuccess } = props;

    const [biometricAuthStatus, setBiometricAuthStatus] = useState<'unsupported' | 'success' | 'error'>();

    const authenticate = async () => {
        try {
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();

            const canUseBiometrics = hasHardware && supportedTypes.length > 0 && isEnrolled;

            if (!canUseBiometrics) {
                setBiometricAuthStatus('unsupported');
                return;
            }

            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Authenticate to continue',
                fallbackLabel: 'Use device passcode',
                disableDeviceFallback: false,
            });

            if (result.success) {
                setBiometricAuthStatus('success');
                onSuccess();
            } else {
                setBiometricAuthStatus('error');
            }
        } catch (error) {
            console.error('Biometric auth error:', error);
            setBiometricAuthStatus('error');
        }
    };

    useEffect(() => {
        authenticate();
    }, []);

    if (!biometricAuthStatus) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
                <Text style={{ marginTop: 10 }}>Authenticating...</Text>
            </View>
        );
    }

    if (biometricAuthStatus === 'unsupported' || biometricAuthStatus === 'error') {
        return <AuthenticationPinScreen onSuccess={onSuccess} />;
    }

    return <Text>Authentication successful!</Text>;
}

export default AuthenticationScreen;
