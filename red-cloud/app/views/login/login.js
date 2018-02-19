import React from 'react';
import { RkButton, RkText, RkTheme } from 'react-native-ui-kitten';
import { View, Image, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modalbox';
import { Hoshi } from 'react-native-textinput-effects';
import { StatusBarPadding } from './../../config/header';
import { login } from '../../rest/httpRequest';

const imageSrc = require('../../assets/images/logo.png');
const styleFile = require('./style/styles');

export class Login extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props);
		this.state = {
			user: '',
			password: '',
			writtenPassword: '',
			log: false,
			cptLog: 0,
			modalVisible: false,
		};
		console.log(url.parse(NativeModules.SourceCode.scriptURL));
	}

	checkUsername() {
		if (this.state.user === 'cisco') {
			return true;
		}
		return false;
	}

	checkPassword() {
		if (this.state.writtenPassword === 'class') {
			return true;
		}
		return false;
	}

	checkLogin() {
		login(this.state.user, this.state.writtenPassword).then((response) => {
			if (response.connected) {
				this.props.navigation.navigate('Tournois');
			} else if (this.state.cptLog < 2) {
				this.state.cptLog++;
				this.setState({ modalVisible: !this.state.modalVisible });
			} else {
				this.props.navigation.navigate('PasswordRecovery');
			}
		});
	}

	toogleModal() {
		this.setState({ modalVisible: !this.state.modalVisible });
	}

	renderImage() {
		const image = <Image source={imageSrc} style={{ width: 200, height: 270, marginHorizontal: 80 }} />;
		return image;
	}

	renderModal() {
		return (
			<Modal
				style={{
					backgroundColor: 'transparent',
					justifyContent: 'center',
					alignItems: 'center',
					height: 400,
					width: 300,
				}}
				position={'center'}
				isOpen={this.state.modalVisible}
				backdropOpacity={0.8}
			>
				<RkButton rkType="clear">Nom d'utilisateur ou mot de passe incorrect</RkButton>
				<TouchableOpacity
					style={[styleFile.buttonConditions, { marginTop: 20, borderRadius: 5 }]}
					onPress={() => {
						this.toogleModal();
					}}
				>
					<View>
						<Text style={{ color: 'black' }}>Retour</Text>
					</View>
				</TouchableOpacity>
			</Modal>
		);
	}

	render() {
		return (
			<KeyboardAvoidingView style={styles.screen} behavior="padding" keyboardVerticalOffset={55}>
				<View>
					<ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive">
						{this.renderImage()}
						{this.renderModal()}
						<Hoshi
							label={'Nom utilisateur'}
							rkType="textInputLogin"
							onChangeText={(user) => {
								this.setState({ user });
							}}
							value={this.state.user}
						/>
						<Hoshi
							label={'Mot de passe'}
							rkType="textInputLogin"
							onChangeText={(writtenPassword) => {
								this.setState({ writtenPassword });
							}}
							value={this.state.writtenPassword}
							secureTextEntry
						/>
						<RkButton
							rkType="social"
							style={styles.buttonSignIn}
							onPress={() => {
								this.checkLogin();
							}}
						>
							<RkText rkType="awesome hero accentColor">Se Connecter</RkText>
						</RkButton>
						<RkText
							rkType="primary3"
							style={{
								color: 'white',
								marginTop: 40,
								marginLeft: 50,
								marginRight: 100,
								width: 160,
							}}
						>
							Pas encore de compte ?{' '}
						</RkText>
						<RkButton
							rkType="clear"
							style={{ marginTop: -20, marginLeft: 160 }}
							onPress={() => {
								this.props.navigation.navigate('ListeJeux', { user: 'Lucy' });
							}}
							title="Signup"
						>
							<RkText rktype="header6" style={{ color: 'red' }}>
								Inscris toi
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
		paddingTop: StatusBarPadding,
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
};
