// service for asyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

const localStorageService = {
  setItem: async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  },
  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // remove error
    }
  },
  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }
  },
  getItem: async (key: string): Promise<string | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (e) {
      // error reading value
      return null;
    }
  },
};

export default localStorageService;
