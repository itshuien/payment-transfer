import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
    onKeyPress: (value: string) => void;
    onBackspacePress: () => void;
}

const NumericKeyboard: React.FC<Props> = (props) => {
    const { onKeyPress, onBackspacePress } = props;

    const { bottom } = useSafeAreaInsets();

    const renderKey = (value: string) => (
        <TouchableOpacity
            style={styles.key}
            onPress={() => onKeyPress(value)}
            activeOpacity={0.5}
        >
            <Text style={styles.keyText}>{value}</Text>
        </TouchableOpacity>
    );

    const renderBackspaceKey = () => (
        <TouchableOpacity
            style={styles.backspaceKey}
            onPress={onBackspacePress}
            activeOpacity={0.5}
        >
            <Ionicons name="backspace" size={24} color="black" />
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { paddingBottom: bottom + 16 }]}>
            <View style={styles.row}>
                {renderKey('1')}
                {renderKey('2')}
                {renderKey('3')}
            </View>
            <View style={styles.row}>
                {renderKey('4')}
                {renderKey('5')}
                {renderKey('6')}
            </View>
            <View style={styles.row}>
                {renderKey('7')}
                {renderKey('8')}
                {renderKey('9')}
            </View>
            <View style={styles.row}>
                <View style={styles.key} />
                {renderKey('0')}
                {renderBackspaceKey()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingBottom: 10,
        gap: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    key: {
        flex: 1,
        padding: 16,
        borderRadius: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyText: {
        fontSize: 24,
        color: '#333',
    },
    backspaceKey: {
        flex: 1,
        padding: 16,
        borderRadius: 48,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default NumericKeyboard;
