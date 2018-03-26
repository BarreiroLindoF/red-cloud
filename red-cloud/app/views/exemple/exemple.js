import React from 'react';
import { Text, View } from 'react-native';

class Exemple extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = ({ navigation }) => ({
		title: `Chat with ${navigation.state.params.user}`,
		//headerLeft: null, // ne pas avoir flèche pour revenir en arriere
	});
	render() {
		const { params } = this.props.navigation.state;
		return (
			<View>
				<Text>Chat with {params.user}</Text>
			</View>
		);
	}
}

export default Exemple;
