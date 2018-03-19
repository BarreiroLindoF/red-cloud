import React from 'react';
import { connect } from 'react-redux';
import { RkButton, RkText, RkTheme } from 'react-native-ui-kitten';
import { View, Image, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modalbox';
import { Hoshi } from 'react-native-textinput-effects';
import { StatusBarPadding } from './../../config/header';
import { api, URL } from './../../rest/api';
import { updatePseudo, updatePassword, updateToken } from './../../redux/actions';
import { checkPassword } from './../../common/check';

const imageSrc = require('../../assets/images/logo.png');
const styleFile = require('./style/styles');

const mapStateToProps = (state) => {
	return {
		pseudo: state.pseudo,
		password: state.password,
	};
};

const mapDispatchToProps = (dispatch) => ({
	updatePseudo: (pseudo) => {
		dispatch(updatePseudo(pseudo));
	},
	updatePassword: (password) => {
		dispatch(updatePassword(password));
	},
	updateToken: (token) => {
		dispatch(updateToken(token));
	},
});

class Login extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props);
		this.state = {
			log: false,
			cptLog: 0,
			modalVisible: false,
		};
	}

	checkLogin() {
		api()
			.post(URL.login, {
				pseudo: this.props.pseudo,
				password: this.props.password,
			})
			.then((response) => {
				if (response.data.success) {
					this.props.updateToken(response.data.payload);
					this.props.navigation.navigate('Events');
				} else if (this.state.cptLog < 2) {
					this.state.cptLog++;
					this.setState({ modalVisible: !this.state.modalVisible });
				} else {
					this.props.navigation.navigate('PasswordRecovery');
				}
			})
			.catch((error) => {
				console.log(error);
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
							onChangeText={this.props.updatePseudo}
							borderColor={this.props.pseudo !== '' ? 'grey' : '#ff4444'}
							value={this.props.pseudo}
						/>
						<Hoshi
							label={'Mot de passe'}
							rkType="textInputLogin"
							onChangeText={this.props.updatePassword}
							borderColor={checkPassword(this.props.password) ? 'grey' : '#ff4444'}
							value={this.props.password}
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
								marginTop: 20,
								marginLeft: 50,
							}}
						>
							Pas encore de compte?{' '}
						</RkText>
						<RkButton
							rkType="clear"
							style={{
								marginTop: -20,
								marginLeft: 160,
							}}
							onPress={() => {
								this.props.navigation.navigate('Signup');
							}}
							title="Signup"
						>
							<RkText rktype="header6" style={{ color: 'red' }}>
								Inscris toi!
							</RkText>
						</RkButton>
						<RkButton
							rkType="clear"
							style={{ marginTop: 20 }}
							onPress={() => {
								this.props.navigation.navigate('PasswordRecovery');
							}}
						>
							<RkText rkType="header6" style={{ color: 'red' }}>
								Mot de passe oublié ?
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
