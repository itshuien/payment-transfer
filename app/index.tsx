import Button from "@components/Button";
import ScreenHeader from "@components/ScreenHeader";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function Index() {
    const router = useRouter();

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
