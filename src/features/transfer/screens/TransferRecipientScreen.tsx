import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, FlatListProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenHeader from '@components/ScreenHeader';
import useTransferContext from '../context/useTransferContext';
import { Contact } from '@features/contacts/types';
import { CONTACTS } from '@features/contacts/constants';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TransferRecipientScreen = () => {
    const router = useRouter();

    const { bottom } = useSafeAreaInsets();

    const { setRecipient } = useTransferContext();

    const onContactPress = (contact: Contact) => {
        setRecipient(contact);
        router.push('/transfer/amount');
    };

    const renderItem: FlatListProps<Contact>['renderItem'] = ({ item }) => (
        <TouchableOpacity
            key={`${item.name}-${item.phoneNumber}`}
            onPress={() => onContactPress(item)}
            style={styles.contactItem}
            activeOpacity={0.7}
        >
            <View style={styles.contactAvatar}>
                <Ionicons name="person" size={24} color="#bbb" />
            </View>
            <View style={{ gap: 4 }}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactPhoneNumber}>{item.phoneNumber}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>
            <ScreenHeader
                title={'Select recipient'}
                onBackPress={() => router.back()}
            />
            <FlatList
                data={CONTACTS}
                renderItem={renderItem}
                keyExtractor={(item) => `${item.name}-${item.phoneNumber}`}
                style={styles.contactList}
                contentContainerStyle={{ paddingBottom: bottom }}

                /**
                 * Avoid scrollbar alignment issue
                 * @see https://github.com/facebook/react-native/issues/26610
                 */
                scrollIndicatorInsets={{ top: 1 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    contactList: {
        flex: 1,
    },
    contactItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    contactAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#ddd",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 20,
    },
    contactName: {
        fontSize: 18,
        fontWeight: 500,
    },
    contactPhoneNumber: {
        fontSize: 14,
        color: "#888",
    }
})

export default TransferRecipientScreen;
