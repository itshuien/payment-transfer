import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import React from 'react';

interface Props {
    text: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

const Button: React.FC<Props> = (props) => {
    const { text, onPress } = props;

    return (
        <TouchableOpacity
            style={[styles.container, props.style]}
            onPress={onPress}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
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
