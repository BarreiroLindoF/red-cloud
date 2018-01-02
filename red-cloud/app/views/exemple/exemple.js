import React from 'react'
import { Text, View } from 'react-native'

export class Exemple extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		//eslint-disable-line
		title: `Chat with ${navigation.state.params.user}`,
		headerLeft: null, // ne pas avoir flèche pour revenir en arriere
	})
	render() {
		const { params } = this.props.navigation.state
		return (
			<View>
				<Text>Chat with {params.user}</Text>
			</View>
		)
	}
}
