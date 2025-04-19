import * as SecureStore from 'expo-secure-store';

type SecureStoreKey = 'USER_PIN';

class SecureStoreService {
    public static async setItem(key: SecureStoreKey, value: string): Promise<void> {
        await SecureStore.setItemAsync(key, value);
    }

    public static async getItem(key: SecureStoreKey): Promise<string | null> {
        return await SecureStore.getItemAsync(key);
    }
}

export default SecureStoreService;
