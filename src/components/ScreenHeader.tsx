import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    title: string;
    onBackPress?: () => void;
}

const ScreenHeader: React.FC<Props> = (props) => {
    const { title, onBackPress } = props;

    return (
        <SafeAreaView>
            <View style={styles.container}>
                {onBackPress
                    ? (
                        <TouchableOpacity onPress={onBackPress} style={styles.sideContent}>
                            <Ionicons name="arrow-back" size={24} />
                        </TouchableOpacity>
                    )
                    : <View style={styles.sideContent} />
                }
                <Text style={styles.title}>{title}</Text>
                <View style={styles.sideContent} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    sideContent: {
        flex: 1,
    },
    title: {
        flexGrow: 1,
        fontSize: 18,
        textAlign: 'center',
    },
});

export default ScreenHeader;
