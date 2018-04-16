import React from 'react';
import { connect } from 'react-redux';
import { RkButton, RkText, RkTheme } from 'react-native-ui-kitten';
import { View, KeyboardAvoidingView, ScrollView, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import Modal from 'react-native-modalbox';
import { api, URL } from '../../rest/api';
import { checkCodePassword } from '../../common/check';

const styleFile = require('./style/styles');

const mapStateToProps = (state) => {
	return {
		email: state.email,
	};
};

class Code extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		title: 'Mail envoyé',
	};

	constructor(props) {
		super(props);
		this.state = {
			code: '',
			modalVisible: false,
			message: '',
			token: '',
			isFetching: false,
			sendingMail: false,
		};
	}

	sendNewPassword() {
		this.setState({ sendingMail: true });
		api()
			.post(URL.passwordRecovery, {
				user: this.props.email,
			})
			.then((response) => {
				this.setState({
					sendingMail: false,
					message: response.data.message,
				});
				this.toogleModal();
			})
			.catch(() => {
				this.setState({
					sendingMail: false,
					message: "Problème de connexion au serveur lors de l'envoi du mail.",
					modalVisible: true,
				});
			});
	}

	openNewPasswordWindow() {
		this.props.navigation.navigate('NewPassword', {
			token: this.state.token,
		});
	}

	toogleModal() {
		this.setState({ modalVisible: !this.state.modalVisible });
	}

	checkCode() {
		this.setState({ isFetching: true });
		api()
			.post(URL.code, {
				email: this.props.email,
				code: this.state.code,
			})
			.then((response) => {
				if (response.data.success) {
					this.setState({
						message: 'Code valide',
						token: response.data.payload,
						isFetching: false,
					});
				} else {
					this.setState({ message: 'Code invalide', isFetching: false });
				}
				this.toogleModal();
			})
			.catch(() => {
				this.setState({
					message: 'Problème de connexion au serveur lors de la vérification du code !',
					isFetching: false,
					modalVisible: true,
				});
			});
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
				<RkButton rkType="clear">{this.state.message} </RkButton>
				<TouchableOpacity
					style={[styleFile.buttonConditions, { marginTop: 20, borderRadius: 5 }]}
					onPress={() => {
						this.toogleModal();
						if (this.state.token !== '') {
							this.openNewPasswordWindow();
						}
					}}
				>
					<View>
						<Text style={{ color: 'black' }}>Retour</Text>
					</View>
				</TouchableOpacity>
			</Modal>
		);
	}

	renderButtonEnvoyer() {
		if (this.state.isFetching) {
			return <ActivityIndicator size="large" color="#cc0000" style={{ paddingTop: 45 }} />;
		}
		return (
			<RkButton
				rkType="social"
				style={styles.buttonSend}
				onPress={() => {
					this.checkCode();
				}}
			>
				<RkText rkType="awesome hero accentColor" style={{ color: 'white' }}>
					Envoyer
				</RkText>
			</RkButton>
		);
	}

	renderRenvoiEmail() {
		if (this.state.sendingMail) {
			return <ActivityIndicator size="large" color="white" style={{ paddingTop: 45 }} />;
		}
		return (
			<View>
				<RkText
					style={{
						color: 'white',
						marginTop: 50,
						marginLeft: 50,
					}}
				>
					Pensez à consulter vos spams ou{' '}
				</RkText>
				<RkButton
					rkType="clear"
					style={{}}
					onPress={() => {
						this.sendNewPassword();
					}}
				>
					<RkText rkType="header6" style={{ color: 'red' }}>
						renvoyer un nouveau code
					</RkText>
				</RkButton>
			</View>
		);
	}

	render() {
		return (
			<KeyboardAvoidingView style={styles.screen} behavior="padding" keyboardVerticalOffset={55}>
				<View>
					<ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive">
						{this.renderModal()}
						<Hoshi
							label={'Code (6 caractères)'}
							style={{ marginTop: 150 }}
							borderColor={checkCodePassword(this.state.code) ? 'grey' : '#ff4444'}
							onChangeText={(code) => {
								this.setState({ code });
							}}
							value={this.state.code}
						/>
						{this.renderButtonEnvoyer()}
						{this.renderRenvoiEmail()}
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

export default connect(mapStateToProps)(Code);
