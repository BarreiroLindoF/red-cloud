import React from 'react'
import { Text, View, Button } from 'react-native'

export class Login extends React.Component {
	static navigationOptions = {
		title: 'Tournois',
	}
	render() {
		const { navigate } = this.props.navigation
		return (
			<View>
				<Text>Hello, Chat App!</Text>
				<Button onPress={() => navigate('Tournois')} title="Aller à la liste des tournois" />
			</View>
		)
	}
}
