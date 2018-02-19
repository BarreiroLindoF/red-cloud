import React from 'react';
import { RkButton, RkText, RkTheme } from 'react-native-ui-kitten';
import { View, KeyboardAvoidingView, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import Modal from 'react-native-modalbox';

const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const styleFile = require('./style/styles');

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
			modalVisible: false,
		};
	}

	toogleModal() {
		this.setState({ modalVisible: !this.state.modalVisible });
	}

	checkEmail() {
		if (reg.test(this.state.eMail) === true) {
			return true;
		}
		return false;
	}

	checkNewPassword() {
		if (this.state.newPassword === this.state.password) {
			if (reg.test(this.state.password) === true) {
				return true;
			}
			return false;
		}
		return false;
	}

	checkPasswordRecovered() {
		if (this.checkEmail() && this.checkNewPassword()) {
			this.props.navigation.navigate('Tournois');
		} else {
			this.toogleModal();
		}
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
				<RkButton rkType="clear">Une des erreurs suivantes est survenue : </RkButton>
				<RkButton rkType="clear">1) Le format d'adresse mail incorrect </RkButton>
				<RkButton rkType="clear">2) Le mot de passe est trop simple (8 caractères dont 1 chiffre) </RkButton>
				<RkButton rkType="clear">3) Les deux mots de passes ne sont pas identiques</RkButton>
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
						{this.renderModal()}
						<Hoshi
							label={'E-Mail'}
							style={{ marginTop: 150 }}
							onChangeText={(eMail) => {
								this.setState({ eMail });
							}}
							value={this.state.eMail}
						/>
						<Hoshi
							label={'Nouveau mot de passe'}
							secureTextEntry
							onChangeText={(password) => {
								this.setState({ password });
							}}
							value={this.state.password}
						/>
						<Hoshi
							label={'Confirmer nouveau mot de passe'}
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
		marginTop: 50,
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
