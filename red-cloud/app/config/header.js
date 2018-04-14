import React from 'react';
import { View, StatusBar } from 'react-native';

export const StatusBarPadding = StatusBar.currentHeight;

export class StatusBarPaddingView extends React.Component {
	render() {
		return <View style={{ paddingTop: StatusBar.currentHeight }} />;
	}
}
