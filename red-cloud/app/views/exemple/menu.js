import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StatusBarPaddingView } from './../../config/header';

class Menu extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		header: null,
		tabBarLabel: 'Menu',
		tabBarIcon: () => {
			return <Icon size={24} color="red" name="local-bar" />;
		},
	};
	render() {
		return (
			<View>
				<StatusBarPaddingView />
				<View>
					<Text>Menu ici</Text>
				</View>
			</View>
		);
	}
}

export default Menu;
