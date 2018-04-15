import React from 'react';
import { Image, StatusBar, View } from 'react-native';

const image = require('../../assets/images/logoAllonge.jpg');

class LogoHeader extends React.Component {
	render() {
		return (
			<View>
				<Image source={image} style={{ width: 300, height: 40 }} />
				<StatusBar barStyle="light-content" />
			</View>
		);
	}
}

export default LogoHeader;
