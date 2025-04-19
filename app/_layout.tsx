import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { server } from "src/api/mocks/server";

server.listen({ onUnhandledRequest: 'bypass' });

export default function RootLayout() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="transfer" options={{ gestureEnabled: false }} />
            </Stack>
        </QueryClientProvider>
    );
}
