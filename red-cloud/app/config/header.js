import React from 'react';
import { View, Platform, StatusBar } from 'react-native';

export const StatusBarPadding = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;

export class StatusBarPaddingView extends React.Component {
	render() {
		return <View style={{ paddingTop: StatusBar.currentHeight }} />;
	}
}
