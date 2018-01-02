import React from 'react'
import { RkButton, RkText, RkTheme, RkAvoidKeyboard, RkStyleSheet } from 'react-native-ui-kitten'
import { Text, View, Image, Dimensions, Keyboard, KeyboardAvoidingView, TextInput, ScrollView } from 'react-native'
import { RkTextInput } from 'react-native-ui-kitten/src/components/textinput/rkTextInput'

export class Login extends React.Component {
	static naviagationOptions = {
		header: null,
	}

	constructor(props) {
		super(props)
		this.state = {
			user: '',
			password: '',
			writtenPassword: '',
			log: false,
			cptLog: 0,
		}
	}

	checkUsername() {
		if (this.state.user != '') {
			return true
		}
		return false
	}

	checkPassword() {
		if (this.state.writtenPassword != '') {
			return true
		}
		return false
	}

	checkLogin() {
		if (this.checkUsername() && this.checkPassword()) {
			this.props.navigation.navigate('Tournois')
			return true
		}
		this.props.navigation.navigate('PasswordRecovery')
		;(password) => this.setState({ password })
		return false
	}

	_renderImage() {
		image = (
			<Image
				source={require('../../assets/images/logo.png')}
				style={{ width: 200, height: 270, marginHorizontal: 80 }}
			/>
		)
		return image
	}

	render() {
		let image = this._renderImage()
		return (
			<KeyboardAvoidingView style={styles.screen} behavior="padding" keyboardVerticalOffset={55}>
				<View>
					<ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive">
						{image}
						<RkTextInput
							name="txtUsername"
							rkType="textInputLogin"
							placeholder="Username"
							onChangeText={(user) => this.setState({ user })}
							value={this.state.user}
						/>
						<RkTextInput
							name="txtPassword"
							rkType="textInputLogin"
							placeholder="Password"
							onChangeText={(writtenPassword) => this.setState({ writtenPassword })}
							value={this.state.writtenPassword}
							secureTextEntry={true}
						/>
						<RkButton rkType="social" style={styles.buttonSignIn} onPress={(log) => this.checkLogin()}>
							<RkText rkType="awesome hero accentColor">Se Connecter</RkText>
						</RkButton>
						<RkText
							rkType="primary3"
							style={{ color: 'white', marginTop: 40, marginLeft: 50, marginRight: 100, width: 160 }}
						>
							Pas encore de compte ?{' '}
						</RkText>
						<RkButton
							rkType="clear"
							style={{ marginTop: -20, marginLeft: 160 }}
							onPress={() => this.props.navigation.navigate('Signup', { user: 'Lucy' })}
							title="Signup"
						>
							<RkText rktype="header6" style={{ color: 'red' }}>
								Inscris toi
							</RkText>
						</RkButton>
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

RkTheme.setType('RkTextInput', 'textInputLogin', {
	input: {
		backgroundColor: 'black',
		marginLeft: 50,
		marginHorizontal: 0,
	},
	color: 'white',
	placeholderTextColor: 'gray',
})

let styles = RkStyleSheet.create((theme) => ({
	font: {
		height: 60,
		marginHorizontal: 50,
		color: 'white',
	},
	screen: {
		padding: 10,
		flex: 1,
		backgroundColor: 'black',
	},
	footer: {
		justifyContent: 'flex-end',
		flex: 1,
	},
	buttonSignIn: {
		backgroundColor: 'white',
		marginLeft: 50,
		marginTop: 20,
		width: 250,
	},
	save: {
		marginVertical: 9,
	},
	textRow: {
		justifyContent: 'center',
		flexDirection: 'row',
	},
	font: {},
}))
