import React from 'react';
import { RkButton, RkText, RkTheme } from 'react-native-ui-kitten';
import { View, KeyboardAvoidingView, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import Modal from 'react-native-modalbox';
import { resetPassword } from '../../rest/httpRequest';

const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const styleFile = require('./style/styles');

export class NewPassword extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		title: 'Saisie du nouveau mot de passe',
	};

	constructor(props) {
		super(props);
		this.state = {
			//this.props.navigation.state.params.eMail;
			code: '',
			newPassword: '',
			newPasswordConfirmed: '',
			message: '',
			modalVisible: false,
		};
	}

	openWindowTournois() {
		this.props.navigation.navigate('Tournois');
	}

	toogleModal() {
		this.setState({ modalVisible: !this.state.modalVisible });
	}

	checkPasswords() {
		if (this.state.newPasswordConfirmed === this.state.newPassword) {
			resetPassword(
				this.props.navigation.state.params.email,
				this.props.navigation.state.params.token,
				this.state.newPasswordConfirmed,
			).then((response) => {
				if (response.success === true) {
					console.log(response);
					this.setState({ message: response.message });
					this.openWindowTournois();
				} else {
					console.log(this.props.navigation.state.params.token);
					this.setState({ message: response.message });
					this.toogleModal();
				}
			});
		} else {
			this.setState({ message: 'Veuillez entrer 2x le même mot de passe' });
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
				<RkButton rkType="clear"> {this.state.message} </RkButton>
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
							label={'Nouveau mot de passe'}
							style={{ marginTop: 150 }}
							onChangeText={(newPassword) => {
								this.setState({ newPassword });
							}}
							value={this.state.newPassword}
							secureTextEntry
						/>
						<Hoshi
							label={'Confirmation nouveau mot de passe'}
							style={{ marginTop: 20 }}
							onChangeText={(newPasswordConfirmed) => {
								this.setState({ newPasswordConfirmed });
							}}
							value={this.state.newPasswordConfirmed}
							secureTextEntry
						/>
						<RkButton
							rkType="social"
							style={styles.buttonSend}
							onPress={() => {
								this.checkPasswords();
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
