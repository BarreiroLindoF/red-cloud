import React from 'react';
import { connect } from 'react-redux';
import { RkButton, RkText, RkTheme } from 'react-native-ui-kitten';
import { View, Image, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modalbox';
import { Hoshi } from 'react-native-textinput-effects';
import { NavigationActions } from 'react-navigation';
import { StatusBarPadding } from './../../config/header';
import { api, URL } from './../../rest/api';
import { updatePseudo, updatePassword, userLogin } from './../../redux/actions';
import { checkPassword } from './../../common/check';
import stylesBlack from './../../styles/StyleSheetB';
import { registerForPushNotificationsAsync } from './../../notifications/notifications';
import RecupMotDePasse from './recupMotDePasse';

const imageSrc = require('../../assets/images/logo.png');

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
	userLogin: (user) => {
		dispatch(userLogin(user));
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
			modalVisible: false,
			modalMessage: '',
			isFetching: false,
			recupOpen: false,
		};
	}

	sendLoginPost(token) {
		api()
			.post(URL.login, {
				pseudo: this.props.pseudo,
				password: this.props.password,
				notificationToken: token,
			})
			.then((response) => {
				if (response.data.success) {
					this.props.userLogin(response.data.payload);
					this.openEvents();
				} else {
					this.setState({
						modalVisible: true,
						modalMessage: "Nom d'utilisateur ou mot de passe incorrect",
						isFetching: false,
					});
				}
			})
			.catch(() => {
				this.setState({
					modalVisible: true,
					modalMessage: 'Problème de connexion au serveur !',
					isFetching: false,
				});
			});
	}

	checkLogin() {
		registerForPushNotificationsAsync().then((token) => {
			this.sendLoginPost(token);
		});
	}

	openEvents() {
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'Tabs' })],
		});
		this.props.navigation.dispatch(resetAction);
	}

	toogleModal() {
		this.setState({ modalVisible: !this.state.modalVisible });
	}

	renderImage() {
		const image = (
			<View style={stylesBlack.centerContent}>
				<Image source={imageSrc} style={{ width: 200, height: 270 }} />
			</View>
		);
		return image;
	}

	renderModal() {
		return (
			<Modal
				style={stylesBlack.modalStyle}
				position={'center'}
				isOpen={this.state.modalVisible}
				backdropOpacity={0.8}
				swipeToClose={false}
				backdropPressToClose={false}
			>
				<RkButton rkType="clear">{this.state.modalMessage}</RkButton>
				<TouchableOpacity
					style={stylesBlack.modalButton}
					onPress={() => {
						this.toogleModal();
					}}
				>
					<View>
						<Text style={stylesBlack.btnFont}>Retour</Text>
					</View>
				</TouchableOpacity>
			</Modal>
		);
	}

	renderLoginButton() {
		if (this.state.isFetching) {
			return <ActivityIndicator size="large" color="#cc0000" style={{ paddingTop: 15 }} />;
		}
		return (
			<View style={stylesBlack.btnPosition}>
				<RkButton
					rkType="social"
					style={stylesBlack.btnStyle}
					onPress={() => {
						this.setState({ isFetching: true }, this.checkLogin());
					}}
				>
					<RkText rkType="awesome hero accentColor" style={stylesBlack.btnFont}>
						Se Connecter
					</RkText>
				</RkButton>
			</View>
		);
	}

	render() {
		return (
			<KeyboardAvoidingView
				style={stylesBlack.mainContentContainer}
				behavior="padding"
				keyboardVerticalOffset={55}
			>
				<View style={stylesBlack.scrollViewContainer}>
					<ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive">
						{this.renderImage()}
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
						{this.renderLoginButton()}
						<View style={stylesBlack.centerContent}>
							<Text style={stylesBlack.mainText}>Pas encore de compte? </Text>

							<RkButton
								rkType="clear"
								onPress={() => {
									this.setState({ isFetching: false });
									this.props.navigation.navigate('Signup', {
										isSigningUp: true,
									});
								}}
								title="Signup"
							>
								<RkText rktype="header6" style={stylesBlack.linkText}>
									Inscris toi!
								</RkText>
							</RkButton>
						</View>
						<RkButton
							rkType="clear"
							onPress={() => {
								this.setState({ isFetching: false, recupOpen: true });
							}}
						>
							<RkText rkType="header6" style={stylesBlack.linkText}>
								Mot de passe oublié ?
							</RkText>
						</RkButton>
					</ScrollView>
				</View>
				<RecupMotDePasse
					open={this.state.recupOpen}
					closeModal={() => {
						this.setState({ recupOpen: false });
					}}
					modifMdp={false}
				/>
				{this.renderModal()}
			</KeyboardAvoidingView>
		);
	}
}

RkTheme.setType('RkTextInput', 'textInputLogin', {
	input: {
		backgroundColor: 'black',
		marginHorizontal: 0,
	},
	color: 'white',
	placeholderTextColor: 'gray',
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
