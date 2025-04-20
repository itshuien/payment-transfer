import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, FlatListProps, StyleSheet, View } from 'react-native';
import ScreenHeader from '@components/ScreenHeader';
import useTransferContext from '../context/useTransferContext';
import { Contact } from '@features/contacts/types';
import { CONTACTS } from '@features/contacts/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ListItem from '@components/ListItem';

const TransferRecipientScreen = () => {
    const router = useRouter();

    const { bottom } = useSafeAreaInsets();

    const { setRecipient } = useTransferContext();

    const onContactPress = (contact: Contact) => {
        setRecipient(contact);
        router.push('/transfer/amount');
    };

    const renderItem: FlatListProps<Contact>['renderItem'] = ({ item }) => (
        <ListItem
            leading={{ icon: 'person' }}
            text={{
                primary: item.name,
                secondary: item.phoneNumber,
            }}
            onPress={() => onContactPress(item)}
        />
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
                ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#ddd' }} />}

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
