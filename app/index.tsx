import { useEffect } from "react";
import SecureStoreService from "src/services/SecureStoreService";
import HomeScreen from "@features/home/screens/HomeScreen";

export default function Index() {
    useEffect(() => {
        // Mock in-app PIN
        SecureStoreService.setItem('USER_PIN', '111111');
    }, []);

    return <HomeScreen />
}
