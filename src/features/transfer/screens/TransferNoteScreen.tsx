import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Text, TextInput, StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import ScreenHeader from '@components/ScreenHeader';
import Button from '@components/Button';
import useTransferContext from '../context/useTransferContext';

const NOTE_SUGGESTIONS = [
    'Lunch',
    'Groceries',
    'Coffee',
    'Thank you',
    'Pocket money',
    'Gift',
];

const TransferNoteScreen = () => {
    const router = useRouter();

    const { setNote: setTransferNote } = useTransferContext();

    const [note, setNote] = useState('');

    const onSuggestionPress = (suggestion: string) => {
        setNote(suggestion);
    };

    const onNextPress = () => {
        setTransferNote(note);
        router.push('/transfer/confirmation');
    };

    return (
        <View style={{ flex: 1 }}>
            <ScreenHeader
                title={'Add a note'}
                onBackPress={() => router.back()}
            />
            <KeyboardAvoidingView style={styles.body} behavior="padding">
                <View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.label}>Optional note for the recipient</Text>
                        <TextInput
                            placeholder="Enter your note here"
                            value={note}
                            onChangeText={setNote}
                            style={styles.noteInput}
                            multiline
                            autoFocus
                        />
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.label}>Quick notes</Text>
                        <View style={styles.suggestionsContainer}>
                            {NOTE_SUGGESTIONS.map((suggestion) => (
                                <TouchableOpacity
                                    key={suggestion}
                                    style={styles.suggestionChip}
                                    onPress={() => onSuggestionPress(suggestion)}
                                >
                                    <Text>{suggestion}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
                <SafeAreaView>
                    <Button
                        text={'Next'}
                        onPress={onNextPress}
                        style={styles.cta}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 16,
    },
    sectionContainer: {
        gap: 16,
        marginBottom: 24,
    },
    label: {
        color: "#777",
    },
    noteInput: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 16,
        height: 80,
    },
    suggestionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    suggestionChip: {
        backgroundColor: '#ddd',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 16,
        alignSelf: 'flex-start',
    },
    cta: {
        margin: 16,
    },
});

export default TransferNoteScreen;
