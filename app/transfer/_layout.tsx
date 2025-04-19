import { Stack } from 'expo-router';

export default function TransferLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="amount" />
            <Stack.Screen name="note" />
            <Stack.Screen name="confirmation" />
            <Stack.Screen name="success" options={{ gestureEnabled: false }} />
        </Stack>
    );
}
