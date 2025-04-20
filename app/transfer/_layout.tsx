import TransferContextProvider from '@features/transfer/context/TransferContextProvider';
import { Stack, useLocalSearchParams } from 'expo-router';

type Params = {
    recipientName: string;
    recipientPhoneNumber: string;
    amount: string;
    note: string;
}

export default function TransferLayout() {
    const { recipientName, recipientPhoneNumber, amount, note } = useLocalSearchParams<Params>();

    return (
        <TransferContextProvider
            initialState={{
                recipient: {
                    name: recipientName || '',
                    phoneNumber: recipientPhoneNumber || '',
                },
                amount: Number(amount) || 0,
                note: note || '',
            }}
        >
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="amount" />
                <Stack.Screen name="note" />
                <Stack.Screen name="confirmation" />
                <Stack.Screen name="authentication" />
                <Stack.Screen name="processing" options={{ gestureEnabled: false }} />
                <Stack.Screen name="success" options={{ gestureEnabled: false }} />
                <Stack.Screen name="failure" options={{ gestureEnabled: false }} />
                <Stack.Screen name="history-details" />
            </Stack>
        </TransferContextProvider>
    );
}
