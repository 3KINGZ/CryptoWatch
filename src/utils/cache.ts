import AsyncStorage from "@react-native-async-storage/async-storage";

const prefix = "@";

//read
export const read = async (item: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(prefix + item);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return item === "watchList" ? [] : null;
  }
};

//write
export const write = async (item: string, data: any) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(prefix + item, jsonValue);
  } catch (e) {
    return null;
  }
};
