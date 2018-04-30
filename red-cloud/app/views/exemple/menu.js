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
				<View style={Styles.rubanHaut}>
					<Text style={Styles.title}>Menu</Text>
				</View>
				<View>
					<Text>Menu ici</Text>
				</View>
			</View>
		);
	}
}

let Styles = {
	rubanHaut: {
		backgroundColor: '#cc0000',
		paddingBottom: 10,
		paddingTop: 10,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
		borderColor: 'black',
		borderBottomWidth: 1,
		borderTopWidth: 1,
	},
	title: {
		color: 'white',
		backgroundColor: 'black',
		padding: 10,
		fontWight: 'bold',
		fontFamily: 'monospace',
	},
};

export default Menu;
