import Modal from 'react-native-modalbox';
import React from 'react';
import { connect } from 'react-redux';
import { RkButton, RkText } from 'react-native-ui-kitten';
import { View, KeyboardAvoidingView, Text, ActivityIndicator } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import { api, URL } from './../../rest/api';
import { updatePseudo, updatePassword, updateEmail } from './../../redux/actions';
import { checkCodePassword, checkPassword } from '../../common/check';
import stylesBlack from './../../styles/StyleSheetB';

const mapStateToProps = (state) => {
	return {
		pseudo: state.pseudo,
		password: state.password,
		email: state.email,
	};
};

const mapDispatchToProps = (dispatch) => ({
	updatePseudo: (pseudo) => {
		dispatch(updatePseudo(pseudo));
	},
	updatePassword: (password) => {
		dispatch(updatePassword(password));
	},
	updateEmail: (email) => {
		dispatch(updateEmail(email));
	},
});

class RecupMotDePasse extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			code: '',
			apiResponse: '',
			isFetching: false,
			modalMessage: '',
			mailInexistant: false,
			mustEnterCode: false,
			erreurServeur: false,
			token: '',
			mustEnterNewMdp: this.props.modifMdp,
			newPassword: '',
			confirmPassword: '',
			isModifying: this.props.modifMdp,
			oldPassword: '',
			sendNewCode: false,
		};
	}

	//Vérification du mail ou du pseudo, s'il existe déjà dans le backend : passage à l'étape suivante, sinon affichage d'erreur à l'utilisateur
	checkEmail() {
		this.setState({ isFetching: true });
		const connexion = api();
		connexion.defaults.timeout = 10000;
		connexion
			.post(URL.passwordRecovery, {
				user: this.state.email.trim(),
			})
			.then((response) => {
				this.setState({
					isFetching: false,
					apiResponse: response.data,
					mustEnterCode: response.data.success,
					mailInexistant: !response.data.success,
					modalMessage: !response.data.success ? 'Email ou pseudo inexistant' : '',
					sendNewCode: response.data.success,
				});
				this.props.updateEmail(this.state.apiResponse.payload);
			})
			.catch((error) => {
				console.log(error);
				this.setState({
					isFetching: false,
					modalMessage: 'Echec de connexion au serveur, veuillez réessayer',
				});
			});
	}

	//Vérification de la composition du code à 6 chiffres
	checkCode() {
		this.setState({ isFetching: true });
		api()
			.post(URL.code, {
				email: this.props.email.trim(),
				code: this.state.code.trim(),
			})
			.then((response) => {
				if (response.data.success) {
					this.setState({
						modalMessage: '',
						token: response.data.payload,
						isFetching: false,
						mustEnterNewMdp: true,
						mustEnterCode: false,
						sendNewCode: false,
					});
				} else {
					this.setState({ modalMessage: 'Code invalide', isFetching: false });
				}
			})
			.catch((error) => {
				console.log(error);
				this.setState({
					modalMessage: 'Problème de connexion au serveur lors de la vérification du code !',
					isFetching: false,
				});
			});
	}

	//Envoi de la modification de mot de passse
	sendModification() {
		// send api request
		this.setState({ isFetching: true });
		api()
			.patch(URL.modifyPassword, {
				old_password: this.state.oldPassword,
				new_password: this.state.newPassword,
			})
			.then((response) => {
				this.setState({
					isFetching: false,
					apiResponse: response.data,
					modalMessage: response.data.success ? '' : "L'ancien mot de passe ne correspond pas",
				});
				if (response.data.success) {
					this.setState({ modalMessage: '', newPassword: '', oldPassword: '', confirmPassword: '' });
					this.props.closeModal();
				}
			})
			.catch((error) => {
				console.log(error);
				this.setState({
					isFetching: false,
					modalMessage: 'Problème de connexion au serveur !',
				});
			});
	}

	//Envoi de la demande de récupération de mot de passe
	sendRecovery() {
		this.setState({ isFetching: true });
		api()
			.post(URL.reset, {
				email: this.props.email.trim(),
				token: this.state.token,
				password: this.state.confirmPassword,
			})
			.then((response) => {
				this.setState({
					isFetching: false,
					apiResponse: response.data,
					mustEnterNewMdp: false,
					modalMessage: '',
					newPassword: '',
					confirmPassword: '',
					code: '',
				});
				this.props.closeModal();
			})
			.catch((error) => {
				console.log(error);
				this.setState({
					isFetching: false,
					modalMessage: 'Problème de connexion au serveur !',
				});
			});
	}

	//Vérification de la composition du mot de passe et de celle de la confirmation de mot de passe
	checkPasswords() {
		let errorMessage = '';
		if (!checkPassword(this.state.newPassword)) {
			errorMessage = 'Le nouveau mot de passe doit avoir au moins 8 caracteres avec 1 chiffre.';
			this.setState({ modalMessage: errorMessage });
		} else if (this.state.confirmPassword !== this.state.newPassword) {
			errorMessage = 'Les deux champs doivent contenir le même mot de passe';
			this.setState({ modalMessage: errorMessage });
		} else {
			errorMessage = '';
			this.setState({ modalMessage: '' });
		}
		if (errorMessage === '') {
			if (this.state.isModifying) {
				this.sendModification();
			} else {
				this.sendRecovery();
			}
		}
	}

	//Rendu du bouton envoyer
	renderButtonEnvoyer() {
		if (this.state.isFetching) {
			return <ActivityIndicator size="large" color="#cc0000" />;
		}
		return (
			<RkButton
				rkType="social"
				onPress={() => {
					if (this.state.mustEnterCode) {
						this.checkCode();
					} else if (this.state.mustEnterNewMdp) {
						this.checkPasswords();
					} else {
						this.checkEmail();
					}
				}}
				style={stylesBlack.btnStyle}
			>
				<RkText rkType="awesome hero accentColor" style={stylesBlack.btnFont}>
					Envoyer
				</RkText>
			</RkButton>
		);
	}

	//Rendu global du composant
	render() {
		return (
			<Modal
				style={stylesBlack.modalStyle}
				position={'center'}
				isOpen={this.props.open}
				backdropOpacity={0.95}
				swipeToClose={false}
				backdropPressToClose={false}
				onClosed={() => {
					this.setState({ email: '', modalMessage: '' });
				}}
			>
				<KeyboardAvoidingView
					style={{ justifyContent: 'center', height: '100%', width: '80%' }}
					behavior="padding"
					keyboardVerticalOffset={this.props.modifMdp ? 100 : -150}
				>
					{this.props.modifMdp && (
						<Hoshi
							secureTextEntry
							label="Ancien mot de passe"
							style={{ flexDirection: 'column' }}
							borderColor={checkPassword(this.state.oldPassword) ? 'grey' : '#ff4444'}
							onChangeText={(oldPassword) => {
								this.setState({ oldPassword });
							}}
							value={this.state.oldPassword}
						/>
					)}
					{this.state.mustEnterNewMdp && (
						<View>
							<Hoshi
								secureTextEntry
								label="Nouveau mot de passe"
								style={{ flexDirection: 'column' }}
								borderColor={checkPassword(this.state.newPassword) ? 'grey' : '#ff4444'}
								onChangeText={(newPassword) => {
									this.setState({ newPassword });
								}}
								value={this.state.newPassword}
							/>
							<Hoshi
								secureTextEntry
								label="Confirmer mot de passe"
								style={{ flexDirection: 'column' }}
								borderColor={
									checkPassword(this.state.confirmPassword) &&
									this.state.confirmPassword === this.state.newPassword
										? 'grey'
										: '#ff4444'
								}
								onChangeText={(confirmPassword) => {
									this.setState({ confirmPassword });
								}}
								value={this.state.confirmPassword}
							/>
						</View>
					)}
					{!this.state.mustEnterNewMdp && (
						<Hoshi
							label={this.state.mustEnterCode ? 'Code reçu par mail' : 'Email ou Username'}
							style={{ flexDirection: 'column' }}
							borderColor={
								this.state.email !== '' ||
								(this.state.apiResponse.success && checkCodePassword(this.state.code))
									? 'grey'
									: '#ff4444'
							}
							onChangeText={(input) => {
								!this.state.mustEnterCode
									? this.setState({ email: input })
									: this.setState({ code: input });
							}}
							value={this.state.mustEnterCode ? this.state.code : this.state.email}
						/>
					)}
					<Text style={{ color: 'red', margin: 10 }}>{this.state.modalMessage}</Text>
					{this.state.sendNewCode && (
						<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
							<Text style={{ color: 'white' }}>Vous n'avez pas reçu de code ? </Text>
							<RkButton
								rkType="clear"
								onPress={() => {
									this.checkEmail();
								}}
							>
								<RkText rktype="header6" style={{ color: 'red' }}>
									Cliquez ici !
								</RkText>
							</RkButton>
						</View>
					)}
					<View style={stylesBlack.btnPosition}>
						<RkButton
							rkType="social"
							onPress={() => {
								this.setState({
									mailInexistant: false,
									modalMessage: '',
									mustEnterCode: false,
									newPassword: '',
									oldPassword: '',
									confirmPassword: '',
								});
								this.props.closeModal();
							}}
							style={[stylesBlack.btnStyle, { marginRight: 25 }]}
						>
							<RkText rkType="awesome hero accentColor" style={stylesBlack.btnFont}>
								Annuler
							</RkText>
						</RkButton>
						{this.renderButtonEnvoyer()}
					</View>
				</KeyboardAvoidingView>
			</Modal>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RecupMotDePasse);
