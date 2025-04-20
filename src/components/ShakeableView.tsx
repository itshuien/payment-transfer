import React, { useRef, useImperativeHandle, forwardRef, PropsWithChildren } from 'react';
import { Animated, ViewStyle } from 'react-native';

export type ShakeableViewRef = {
    triggerShake: () => void;
};

interface ShakeableViewProps {
    style?: ViewStyle;
}

const ShakeableView = forwardRef<ShakeableViewRef, PropsWithChildren<ShakeableViewProps>>((props, ref) => {
    const { style, children } = props;

    const shakeAnim = useRef(new Animated.Value(0)).current;

    useImperativeHandle(ref, () => ({
        triggerShake: () => {
            shakeAnim.setValue(0);
            Animated.sequence([
                Animated.timing(shakeAnim, {
                    toValue: 1,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnim, {
                    toValue: -1,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnim, {
                    toValue: 1,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnim, {
                    toValue: 0,
                    duration: 50,
                    useNativeDriver: true,
                }),
            ]).start();
        },
    }));

    const translateX = shakeAnim.interpolate({
        inputRange: [-1, 1],
        outputRange: [-10, 10],
    });

    return (
        <Animated.View style={[{ transform: [{ translateX }] }, style]}>
            {children}
        </Animated.View>
    );
});

export default ShakeableView;
