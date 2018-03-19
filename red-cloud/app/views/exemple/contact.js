import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StatusBarPaddingView } from './../../config/header';

class Contact extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		header: null,
		tabBarLabel: 'Contact',
		tabBarIcon: () => {
			return <Icon size={24} color="white" name="place" />;
		},
	};
	render() {
		return (
			<View>
				<StatusBarPaddingView />
				<View>
					<Text>Contact ici</Text>
				</View>
			</View>
		);
	}
}

export default Contact;
