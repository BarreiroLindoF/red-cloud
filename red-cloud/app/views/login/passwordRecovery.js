import React from 'react'
import { RkButton, RkText, RkTheme, RkAvoidKeyboard, RkStyleSheet } from 'react-native-ui-kitten'
import { Text, View, Image, Dimensions, Keyboard, TextInput } from 'react-native'
import { RkTextInput } from 'react-native-ui-kitten/src/components/textinput/rkTextInput'
import { LoginRC } from './index'

export class PasswordRecovery extends React.Component {
	static naviagationOptions = ({ navigation }) => ({
		title: 'Renouvellement du mot de passe',
	})

	constructor(props) {
		super(props)
		this.state = {
			eMail: '',
			password: '',
			newPassword: '',
		}
	}

	checkEmail() {
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		if (reg.test(this.state.eMail) === true) {
			return true
		}
		return false
	}

	checkNewPassword() {
		if (this.state.newPassword == this.state.password) {
			return true
		}
		return false
	}

	checkPasswordRecovered() {
		if (this.checkEmail() && this.checkNewPassword()) {
			this.props.navigation.navigate('Login')
		}
	}

	render() {
		return (
			<RkAvoidKeyboard
				onStartShouldSetResponder={(e) => true}
				onResponderRelease={(e) => Keyboard.dismiss()}
				style={styles.screen}
			>
				<View>
					<RkTextInput
						rkType="textInputLogin"
						placeholder="e-mail"
						style={{ marginTop: 200 }}
						onChangeText={(eMail) => this.setState({ eMail })}
						value={this.state.eMail}
					/>
					<RkTextInput
						rkType="textInputLogin"
						placeholder="New Password"
						secureTextEntry={true}
						onChangeText={(password) => this.setState({ password })}
						value={this.state.password}
					/>
					<RkTextInput
						rkType="textInputLogin"
						placeholder=" Confirm New Password"
						secureTextEntry={true}
						onChangeText={(newPassword) => this.setState({ newPassword })}
						value={this.state.newPassword}
					/>
					<RkButton rkType="social" style={styles.buttonSend} onPress={() => this.checkPasswordRecovered()}>
						<RkText rkType="awesome hero accentColor" style={{ color: 'white' }}>
							Envoyer
						</RkText>
					</RkButton>
				</View>
			</RkAvoidKeyboard>
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
	buttonSend: {
		backgroundColor: 'red',
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
