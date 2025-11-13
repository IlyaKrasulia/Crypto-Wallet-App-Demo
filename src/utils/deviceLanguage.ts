import { Platform, NativeModules } from 'react-native';

export const deviceLanguage = (() => {
  try {
    if (Platform.OS === 'ios') {
      const settings = NativeModules.SettingsManager?.settings;
      if (settings) {
        return (
          settings.AppleLocale ||
          (settings.AppleLanguages && settings.AppleLanguages[0]) ||
          'en_US'
        );
      }
    } else if (Platform.OS === 'android') {
      return NativeModules.I18nManager?.localeIdentifier || 'en_US';
    }
  } catch (error) {
    console.warn('Error fetching device language:', error);
  }
  return 'en_US';
})();
