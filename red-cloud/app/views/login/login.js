import React from 'react'
import { Text, View, Button } from 'react-native'

export class Login extends React.Component {
	static navigationOptions = {
		title: 'Login',
	}
	render() {
		const { navigate } = this.props.navigation
		return (
			<View>
				<Text>Hello, Chat App!</Text>
				<Button onPress={() => navigate('Chat', { user: 'Lucy' })} title="Chat with Lucy" />
			</View>
		)
	}
}
