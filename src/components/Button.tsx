import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import React from 'react';

type ButtonVariant = 'primary' | 'secondary';

interface Props {
    text: string;
    onPress: () => void;
    disabled?: boolean;
    variant?: ButtonVariant;
    style?: StyleProp<ViewStyle>;
}

const Button: React.FC<Props> = (props) => {
    const { text, onPress, disabled, variant = 'primary', } = props;

    const variantStyles = VARIANT_STYLES[variant];

    return (
        <TouchableOpacity
            style={[
                styles.container,
                variantStyles.container,
                props.style,
                { opacity: disabled ? 0.2 : 1 },
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text
                style={[
                    styles.text,
                    variantStyles.text,
                ]}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
}

const VARIANT_STYLES: Record<ButtonVariant, {
    container: ViewStyle;
    text: TextStyle;
}> = {
    primary: {
        container: {
            backgroundColor: 'black',
        },
        text: {
            color: 'white',
        },
    },
    secondary: {
        container: {
            backgroundColor: '#ddd',
        },
        text: {
            color: 'black',
        },
    },
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 600,
    },
});

export default Button;
