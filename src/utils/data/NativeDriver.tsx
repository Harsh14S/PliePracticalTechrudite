import { Platform } from 'react-native';

export const USE_NATIVE_DRIVER = Platform.select({
    ios: true,
    android: Platform.constants?.Release !== '12',
    default: true,
});
