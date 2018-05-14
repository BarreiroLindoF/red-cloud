import React from 'react';
import { Image, StatusBar, View } from 'react-native';

const image = require('../../assets/images/logoAllonge.jpg');

class LogoHeader extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Image source={image} style={{ width: 300, height: 43 }} />
				<StatusBar barStyle="light-content" />
			</View>
		);
	}
}

export default LogoHeader;
