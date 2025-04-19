import Button from "@components/Button";
import ScreenHeader from "@components/ScreenHeader";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { useEffect } from "react";
import SecureStoreService from "src/services/SecureStoreService";

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        // Mock in-app PIN
        SecureStoreService.setItem('USER_PIN', '111111');
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <ScreenHeader title="Home" />
            <Button
                text="Transfer money"
                onPress={() => router.navigate("/transfer")}
                style={{ paddingHorizontal: 48, margin: 20 }}
            />
        </View>
    );
}
