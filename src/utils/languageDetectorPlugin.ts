/* eslint-disable import/no-import-module-exports */
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import { deviceLanguage } from './deviceLanguage';

const languageDetectorPlugin = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  async detect(callback: (lang: string) => void) {
    try {
      let savedLanguage = await AsyncStorage.getItem('language');
      savedLanguage = savedLanguage ? JSON.parse(savedLanguage) : null;
      const language = deviceLanguage.split('_')[0];
      dayjs.locale(savedLanguage || language);
      return callback(savedLanguage || language);
    } catch (error) {
      console.log('Error reading language', error);
    }
  },
  async cacheUserLanguage(language: string) {
    try {
      await AsyncStorage.setItem('language', JSON.stringify(language));
    } catch (error) {}
  },
};

module.exports = { languageDetectorPlugin };
