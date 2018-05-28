import React from 'react';
import { View, StatusBar, Platform } from 'react-native';

export const StatusBarPadding = () => {
	if (Platform.OS === 'ios') {
		StatusBar.setBarStyle('light-content', true);
	}
	return Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
};

export class StatusBarPaddingView extends React.Component {
	render() {
		return <View style={{ paddingTop: StatusBarPadding() }} />;
	}
}
