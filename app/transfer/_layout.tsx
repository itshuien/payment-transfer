import TransferContextProvider from '@features/transfer/context/TransferContextProvider';
import { Stack } from 'expo-router';

export default function TransferLayout() {
    return (
        <TransferContextProvider>
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
