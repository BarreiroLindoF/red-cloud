import React from 'react';
import { RkButton, RkText, RkTheme, RkTextInput } from 'react-native-ui-kitten';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';

export class PasswordRecovery extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		title: 'Renouvellement du mot de passe',
	};

	constructor(props) {
		super(props);
		this.state = {
			eMail: '',
			password: '',
			newPassword: '',
		};
	}

	checkEmail() {
		const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
		if (reg.test(this.state.eMail) === true) {
			return true;
		}
		return false;
	}

	checkNewPassword() {
		if (this.state.newPassword === this.state.password) {
			return true;
		}
		return false;
	}

	checkPasswordRecovered() {
		if (this.checkEmail() && this.checkNewPassword()) {
			this.props.navigation.navigate('Login');
		}
	}

	render() {
		return (
			<KeyboardAvoidingView style={styles.screen} behavior="padding" keyboardVerticalOffset={55}>
				<View>
					<ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive">
						<RkTextInput
							rkType="textInputLogin"
							placeholder="e-mail"
							style={{ marginTop: 200 }}
							onChangeText={(eMail) => {
								this.setState({ eMail });
							}}
							value={this.state.eMail}
						/>
						<RkTextInput
							rkType="textInputLogin"
							placeholder="New Password"
							secureTextEntry
							onChangeText={(password) => {
								this.setState({ password });
							}}
							value={this.state.password}
						/>
						<RkTextInput
							rkType="textInputLogin"
							placeholder=" Confirm New Password"
							secureTextEntry
							onChangeText={(newPassword) => {
								this.setState({ newPassword });
							}}
							value={this.state.newPassword}
						/>
						<RkButton
							rkType="social"
							style={styles.buttonSend}
							onPress={() => {
								this.checkPasswordRecovered();
							}}
						>
							<RkText rkType="awesome hero accentColor" style={{ color: 'white' }}>
								Envoyer
							</RkText>
						</RkButton>
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
		);
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
});

let styles = {
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
};