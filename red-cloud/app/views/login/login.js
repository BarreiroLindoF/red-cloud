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
import stylesBlack from './../../styles/StyleSheetB';

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
					this.props.navigation.navigate('Tournois');
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
		const image = (
			<Image
				source={imageSrc}
				style={{ width: 200, height: 270, justifyContent: 'center', alignItems: 'center' }}
			/>
		);
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
			<KeyboardAvoidingView
				style={stylesBlack.mainContentContainer}
				behavior="padding"
				keyboardVerticalOffset={55}
			>
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
						<View style={stylesBlack.btnPosition}>
							<RkButton
								rkType="social"
								style={stylesBlack.btnStyle}
								onPress={() => {
									this.checkLogin();
								}}
							>
								<RkText rkType="awesome hero accentColor" style={stylesBlack.btnFont}>
									Se Connecter
								</RkText>
							</RkButton>
						</View>
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
							onPress={() => {
								this.props.navigation.navigate('Signup');
							}}
							title="Signup"
						>
							<RkText rktype="header6" style={stylesBlack.linkText}>
								Inscris toi!
							</RkText>
						</RkButton>
						<RkButton
							rkType="clear"
							onPress={() => {
								this.props.navigation.navigate('PasswordRecovery');
							}}
						>
							<RkText rkType="header6" style={stylesBlack.linkText}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
