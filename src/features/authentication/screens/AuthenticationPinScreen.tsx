import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ScreenHeader from '@components/ScreenHeader';
import { useRouter } from 'expo-router';
import NumericKeyboard from '@components/NumericKeyboard';
import SecureStoreService from 'src/services/SecureStoreService';
import ShakeableView, { ShakeableViewRef } from '@components/ShakeableView';

interface Props {
    onSuccess: () => void;
}

const AuthenticationPinScreen: React.FC<Props> = (props) => {
    const router = useRouter();

    const { onSuccess } = props;

    const shakeRef = useRef<ShakeableViewRef>(null);

    const [pin, setPin] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);

    const validatePin = async (pin: string) => {
        const storedPin = await SecureStoreService.getItem('USER_PIN');
        const isValidPin = storedPin === pin;

        if (isValidPin) {
            onSuccess();
        } else {
            setIsInvalid(true);
            setPin('');
        }
    };

    useEffect(() => {
        if (pin.length !== 6) {
            return;
        }

        validatePin(pin);
    }, [pin, validatePin]);

    useEffect(() => {
        if (isInvalid) {
            shakeRef.current?.triggerShake();
        }
    }, [isInvalid]);

    const onKeyPress = (key: string) => {
        if (pin.length >= 6) return;

        if (isInvalid) {
            setIsInvalid(false);
        }
        setPin((prev) => prev + key);
    };

    const onBackspacePress = () => {
        if (isInvalid) {
            setIsInvalid(false);
        }
        setPin((prev) => prev.slice(0, -1));
    };

    const renderDot = (index: number) => {
        const backgroundColor = isInvalid ? '#ff3333' : pin.length > index ? 'black' : '#ddd';
        return (
            <View
                key={index}
                style={[styles.dot, { backgroundColor }]}
            />
        );
    };

    return (
        <View style={styles.container}>
            <ScreenHeader title="Enter 6-digits PIN" onBackPress={() => router.back()} />
            <View style={styles.body}>
                <ShakeableView ref={shakeRef} style={styles.pinContainer}>
                    <View style={styles.dotsContainer}>
                        {Array.from({ length: 6 }).map((_, index) => renderDot(index))}
                    </View>
                    <Text style={[styles.errorText, { opacity: isInvalid ? 1 : 0 }]}>
                        Invalid PIN. Please try again.
                    </Text>
                </ShakeableView>
                <View style={styles.keyboardContainer}>
                    <NumericKeyboard
                        onKeyPress={onKeyPress}
                        onBackspacePress={onBackspacePress}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        flex: 1,
        justifyContent: 'space-between',
    },
    pinContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 32,
        marginTop: 32,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 32,
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#ddd',
    },
    errorText: {
        color: '#ff3333',
    },
    keyboardContainer: {
        paddingHorizontal: 16,
    }
});

export default AuthenticationPinScreen;
