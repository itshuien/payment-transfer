import { StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native';
import React, { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    leading?:
    | { icon: ComponentProps<typeof Ionicons>['name'] }
    | { imageUrl: string };
    text: {
        primary: string;
        secondary?: string;
    };
    trailing?:
    | { icon: ComponentProps<typeof Ionicons>['name'] }
    | {
        text: string;
        style?: TextStyle;
    };
    onPress: () => void;
}

const ListItem: React.FC<Props> = (props) => {
    const { leading, text, trailing, onPress } = props;

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            {leading && (
                'icon' in leading ? (
                    <View style={styles.leadingContainer}>
                        <Ionicons name={leading.icon} size={24} color="#bbb" />
                    </View>
                ) : (
                    <View style={styles.leadingContainer} />
                )
            )}
            <View style={styles.textContainer}>
                <Text style={styles.primaryText}>
                    {text.primary}
                </Text>
                {text.secondary && (
                    <Text style={styles.secondaryText}>
                        {text.secondary}
                    </Text>
                )}
            </View>
            {trailing && (
                <View>
                    {'icon' in trailing ? (
                        <Ionicons name={trailing.icon} size={24} color="#bbb" />
                    ) : (
                        <Text style={[styles.trailingText, trailing.style]}>
                            {trailing.text}
                        </Text>
                    )}
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        columnGap: 16,
    },
    leadingContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flexGrow: 1,
        flexShrink: 1,
        gap: 4,
    },
    primaryText: {
        fontSize: 18,
        fontWeight: 600,
    },
    secondaryText: {
        fontSize: 14,
        color: '#888',
    },
    trailingText: {
        fontSize: 16,
        color: '#666',
    },
});

export default ListItem
