import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StatusBarPaddingView } from './../../config/header';

class Params extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		header: null,
		tabBarLabel: 'Paramètres',
		tabBarIcon: () => {
			return <Icon size={24} color="red" name="settings" />;
		},
	};
	render() {
		return (
			<View>
				<StatusBarPaddingView />
				<View>
					<View>
						<Text>Paramètres ici</Text>
					</View>
				</View>
			</View>
		);
	}
}

export default Params;
