import AsyncStorage from '@react-native-async-storage/async-storage';

export const ASYNC_KEYS = {
  app_theme: 'user-theme-preference',
  currency: 'currency',
  reminder_time: 'reminder-time',
};

//for store data in asyncstorage
export const asyncStoreData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Async Store Data error --> ', e);
  }
};

//for get data from asyncstorage
export const asyncGetData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Async Get Data error --> ', e);
  }
};

// for remove data from asyncstorage
export const asyncRemoveValue = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Async Remove Value error --> ', e);
  }
};

// for clear all data from asyncstorage
export const asyncClearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error('Async Clear All error --> ', e);
  }
};
