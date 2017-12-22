import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { RkButton } from 'react-native-ui-kitten'
import { StackNavigator } from 'react-navigation'
import { Routes } from './app/config/routes'

export default class App extends React.Component {
	render() {
		return <Routes />
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
