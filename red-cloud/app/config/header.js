import { Platform, StatusBar } from 'react-native';

export const StatusBarPadding = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;
