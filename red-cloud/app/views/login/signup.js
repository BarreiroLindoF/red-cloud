import React from 'react';
import { connect } from 'react-redux';
import {
	View,
	ScrollView,
	KeyboardAvoidingView,
	TouchableOpacity,
	Text,
	Keyboard,
	ActivityIndicator,
	BackHandler,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { RkButton, RkText } from 'react-native-ui-kitten';
import { Hoshi } from 'react-native-textinput-effects';
import Modal from 'react-native-modalbox';
import { api, URL } from '../../rest/api';
import * as Action from './../../redux/actions';
import * as Check from './../../common/check';
import LogoHeader from './../../components/avatar/logoHeader';
import stylesBlack from './../../styles/StyleSheetB';

const mapStateToProps = (state) => {
	return {
		nom: state.nom,
		prenom: state.prenom,
		pseudo: state.pseudo,
		email: state.email,
		npa: state.npa,
		ville: state.ville,
		datenaissance: state.datenaissance,
		password: state.password,
	};
};

const mapDispatchToProps = (dispatch) => ({
	updateNom: (nom) => {
		dispatch(Action.updateNom(nom));
	},
	updatePrenom: (prenom) => {
		dispatch(Action.updatePrenom(prenom));
	},
	updatePseudo: (pseudo) => {
		dispatch(Action.updatePseudo(pseudo));
	},
	updateEmail: (email) => {
		dispatch(Action.updateEmail(email));
	},
	updateNpa: (npa) => {
		dispatch(Action.updateNPA(npa));
	},
	updateVille: (ville) => {
		dispatch(Action.updateVille(ville));
	},
	updateDateNaissance: (date) => {
		dispatch(Action.updateDateNaissance(date));
	},
	updatePassword: (password) => {
		dispatch(Action.updatePassword(password));
	},
});

const anneeMinimumUser = new Date(new Date().setFullYear(new Date().getFullYear() - 12));
let oldReduxState = null;

class Signup extends React.Component {
	//eslint-disable-next-line
	static navigationOptions = {
		headerTitle: <LogoHeader />,
		color: 'white',
		//title: 'Création de ton compte',
	};

	constructor(props) {
		super(props);
		this.state = {
			validationPass: '',
			passOk: false,
			validationPassOk: true,
			validationEmail: false,
			dateOk: true,
			datenaissance: '',
			modalVisible: false,
			npa: false,
			msgModal: '',
			isFetching: false,
			isSigningUp: this.props.navigation.state.params.isSigningUp,
			title: this.props.navigation.state.params.isSigningUp ? 'Crée ton compte' : 'Modifier compte',
			checked: false,
		};
		this.emailChanged = this.emailChanged.bind(this);
		this.npaChanged = this.npaChanged.bind(this);
		this.passwordChanged = this.passwordChanged.bind(this);
		this.validationChanged = this.validationChanged.bind(this);
		this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
	}

	//Exécutée automatiquement lorsque le composant va être chargé, met les différents state à jour avec les propriétés reçues en paramètre de l'appel du composant
	componentWillMount() {
		if (!this.state.isSigningUp) {
			this.npaChanged(this.props.npa);
			this.emailChanged(this.props.email);
			this.setState({ datenaissance: this.props.datenaissance });
			this.saveReduxState();
			BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
		}
	}

	//Appellée automatiquement à la fermeture du composant, permet d'automatiquement lancé l'annulation de la modification
	//au cas où l'utilisateur est en train de modifier son profil dans ce composant
	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
	}

	//Appellée lorsque l'utilisateur annule ses modifications dans son profil
	handleBackButtonClick() {
		this.annulerModification();
		return false;
	}

	//Sauve l'état des valeurs de l'utilisateur dans un état global accessibles dans tous les composants de l'application
	saveReduxState() {
		oldReduxState = {
			prenom: this.props.prenom,
			nom: this.props.nom,
			pseudo: this.props.pseudo,
			ville: this.props.ville,
			npa: this.props.npa,
			datenaissance: this.props.datenaissance,
			email: this.props.email,
		};
	}

	//Fait une vérification de l'email lorsque celui-ci change
	emailChanged(email) {
		this.setState({ validationEmail: Check.checkEmail(email) }, this.props.updateEmail(email));
	}

	//Fait une vérification du npa lorsque celui-ci change
	npaChanged(npa) {
		this.setState({ npa: Check.checkNpa(npa) }, this.props.updateNpa(npa));
	}

	//Fait une vérification du password lorsque celui-ci change
	passwordChanged(password) {
		this.setState({
			passOk: Check.checkPassword(password),
			validationPassOk: password === this.state.validationPass,
		});
		this.props.updatePassword(password);
	}

	//Fait une vérification de la validation du mot de passe lorsque celui-ci change
	validationChanged(validation) {
		this.setState({
			validationPass: validation,
			validationPassOk: this.props.password === validation,
		});
	}

	//Change l'état qui permet d'afficher ou non le modal
	toogleModal() {
		this.setState({ modalVisible: !this.state.modalVisible });
	}

	//Fait une vérification sur l'email et sur le pseudo pour valider que l'utilisateur n'existe pas déjà dans le backend
	//Le pseudo et le mail sont uniques
	userExist() {
		this.setState({ isFetching: true });
		const connexion = api();
		connexion.defaults.timeout = 10000;
		connexion
			.post(URL.selectUser, {
				email: this.props.email.trim(),
				pseudo: this.props.pseudo.trim(),
			})
			.then((response) => {
				this.setState({ isFetching: false });
				if (!response.data.success) {
					this.props.navigation.navigate('ListeJeux', {
						isSigningUp: true,
					});
				} else {
					this.setState({ msgModal: response.data.message });
					this.toogleModal();
				}
			})
			.catch(() => {
				this.setState({
					isFetching: false,
					msgModal: 'Problème lors de la connexion au serveur',
					modalVisible: true,
				});
			});
	}

	//Vérifie que tous les champs ont été remplis correctement avant de passer à la vue suivante
	check() {
		this.setState({ checked: true });
		if (this.state.dateOk && this.state.passOk && this.state.validationPassOk && this.state.validationEmail) {
			this.userExist();
		} else {
			this.setState({
				msgModal: 'Veuillez vérifier que tous les champs en rouges soient correctement remplis.',
			});
			this.toogleModal();
		}
	}

	//Sauvegarde les modifications de l'utilisateur lorsqu'il veut modifier les données de son compte déjà crée
	sauvegarder() {
		if (this.state.dateOk && this.state.validationEmail && this.state.npa) {
			// send request
			this.setState({ isFetching: true });
			api()
				.patch(URL.modifierUtilisateur, {
					prenom: this.props.prenom.trim(),
					nom: this.props.nom.trim(),
					pseudo: this.props.pseudo.trim(),
					ville: this.props.ville.trim(),
					npa: this.props.npa,
					datenaissance: this.props.datenaissance,
					email: this.props.email.trim(),
				})
				.then((response) => {
					this.setState({ isFetching: false });
					if (response.data.success) {
						this.props.navigation.goBack();
					} else {
						this.setState({
							modalVisible: true,
							msgModal: response.data.message,
						});
					}
				})
				.catch(() => {
					this.setState({ isFetching: false });
				});
		} else {
			this.setState({
				msgModal: 'Veuillez vérifier que tous les champs sont correctement remplis.',
				modalVisible: true,
				isFetching: false,
			});
		}
	}

	//Annule les modifications de l'utilisateur au cas où il aimerait revenir à l'ancien état de ses données personnelles
	annulerModification() {
		this.props.updatePrenom(oldReduxState.prenom);
		this.props.updateNom(oldReduxState.nom);
		this.props.updatePseudo(oldReduxState.pseudo);
		this.props.updateVille(oldReduxState.ville);
		this.props.updateNpa(oldReduxState.npa);
		this.props.updateDateNaissance(oldReduxState.datenaissance);
		this.props.updateEmail(oldReduxState.email);
	}

	//Rendu du modal
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
				<RkButton rkType="clear">{this.state.msgModal}</RkButton>
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

	//Rendu des champs de mot de passe et de validation de mot de passe
	renderPasswordFields() {
		if (this.state.isSigningUp) {
			return (
				<View>
					<Hoshi
						label={'Mot de passe (8 caractères dont 1 chiffre)'}
						labelStyle={{ color: this.state.checked && this.props.password === '' ? 'red' : '#6a7989' }}
						borderColor={this.state.passOk ? 'grey' : '#ff4444'}
						onChangeText={this.passwordChanged}
						secureTextEntry
					/>
					<Hoshi
						label={'Validation mot de passe'}
						labelStyle={{
							color: this.state.checked && this.state.validationPass === '' ? 'red' : '#6a7989',
						}}
						borderColor={this.state.validationPassOk ? 'grey' : '#ff4444'}
						onChangeText={this.validationChanged}
						secureTextEntry
					/>
				</View>
			);
		}
		return;
	}

	//Rendu du bouton suivant ou enregistrer selon l'état du composant (création de compte ou modification des données du compte)
	renderButton() {
		if (this.state.isFetching) {
			return (
				<ActivityIndicator
					size="large"
					color="#cc0000"
					style={{
						marginTop: 15,
						marginBottom: 15,
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'flex-end',
					}}
				/>
			);
		}
		let buttonText;
		if (this.state.isSigningUp) {
			buttonText = 'Suivant';
		} else {
			buttonText = 'Enregistrer';
		}
		return (
			<View
				style={{
					marginTop: 15,
					marginBottom: 15,
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'flex-end',
				}}
			>
				<RkButton
					style={stylesBlack.btnStyle}
					rkType="social"
					onPress={() => {
						Keyboard.dismiss();
						if (this.state.isSigningUp) {
							this.check();
						} else {
							this.sauvegarder();
						}
					}}
				>
					<RkText>{buttonText}</RkText>
				</RkButton>
			</View>
		);
	}

	//Rendu du bouton annuler
	renderButtonAnnuler() {
		if (this.state.isSigningUp || this.state.isFetching) return;
		return (
			<View
				style={{
					marginTop: 15,
					marginBottom: 15,
				}}
			>
				<RkButton
					style={stylesBlack.btnStyle}
					rkType="social"
					onPress={() => {
						Keyboard.dismiss();
						this.annulerModification();
						this.props.navigation.goBack();
					}}
				>
					<RkText>Annuler</RkText>
				</RkButton>
			</View>
		);
	}

	//Rendu du composant qui permet à l'utilisateur de choisir sa date de naissance
	renderDatePicker() {
		return (
			<DatePicker
				style={{ width: '100%', paddingBottom: 1 }}
				mode="date"
				date={this.props.datenaissance ? this.props.datenaissance : this.state.dateNaissance}
				androidMode="spinner"
				placeholder="Date de naissance (âge minimum : 12 ans)"
				format="DD.MM.YYYY"
				maxDate={anneeMinimumUser}
				confirmBtnText="Confirmer"
				cancelBtnText="Annuler"
				showIcon={false}
				customStyles={{
					dateInput: {
						borderWidth: 0,
						borderBottomWidth: 2,
						borderBottomColor: '#6a7989',
						alignItems: 'flex-start',
					},
					placeholderText: [
						stylesBlack.placeholderInputSignup,
						{ color: this.state.checked && this.props.datenaissance === '' ? 'red' : '#6a7989' },
					],
					dateText: stylesBlack.textInputSignup,
				}}
				onDateChange={(newDate) => {
					this.props.updateDateNaissance(newDate);
					this.setState({ dateOk: true });
				}}
			/>
		);
	}

	//Rendu du footer qui permet à l'utilisateur de revenir à la vue de login (sur ios, il n'y a pas la flèche pour revenir en arrière comme sur android)
	renderFooter() {
		if (this.state.isSigningUp) {
			return (
				<View style={stylesBlack.footerAccounts}>
					<View>
						<RkText style={{ color: 'white' }} rkType="primary3">
							Vous avez déjà un compte ?
						</RkText>
						<RkButton
							rkType="clear"
							onPress={() => {
								this.props.navigation.navigate('Login');
							}}
						>
							<RkText style={stylesBlack.linkText}> Connectez-vous ici </RkText>
						</RkButton>
					</View>
				</View>
			);
		}
		return;
	}

	//Rendu global du composant
	render() {
		return (
			<KeyboardAvoidingView
				style={stylesBlack.mainContentContainer}
				behavior="padding"
				keyboardVerticalOffset={-35}
			>
				<View>
					<Text style={stylesBlack.title}>{this.state.title}</Text>
				</View>
				<ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive">
					<Hoshi
						label={'Nom'}
						borderColor={this.props.nom !== '' ? 'grey' : '#ff4444'}
						onChangeText={this.props.updateNom}
						value={this.props.nom}
					/>
					<Hoshi
						label={'Prénom'}
						borderColor={'grey'}
						borderColor={this.props.prenom !== '' ? 'grey' : '#ff4444'}
						onChangeText={this.props.updatePrenom}
						value={this.props.prenom}
					/>
					<Hoshi
						label={'Pseudo'}
						labelStyle={{ color: this.state.checked && this.props.pseudo === '' ? 'red' : '#6a7989' }}
						borderColor={'grey'}
						borderColor={this.props.pseudo !== '' ? 'grey' : '#ff4444'}
						onChangeText={this.props.updatePseudo}
						value={this.props.pseudo}
					/>
					<Hoshi
						label={'Email'}
						labelStyle={{ color: this.state.checked && this.props.email === '' ? 'red' : '#6a7989' }}
						keyboardType="email-address"
						borderColor={this.state.validationEmail ? 'grey' : '#ff4444'}
						onChangeText={this.emailChanged}
						value={this.props.email}
					/>
					<Hoshi
						label={'NPA'}
						borderColor={'grey'}
						keyboardType="phone-pad"
						maxLength={4}
						borderColor={this.state.npa ? 'grey' : '#ff4444'}
						onChangeText={this.npaChanged}
						value={this.props.npa}
					/>
					<Hoshi
						label={'Ville'}
						borderColor={'grey'}
						borderColor={this.props.ville !== '' ? 'grey' : '#ff4444'}
						onChangeText={this.props.updateVille}
						value={this.props.ville}
					/>
					<View
						style={{
							backgroundColor: 'black',
							borderBottomColor: '#b9c1ca',
							borderBottomWidth: 2,
							marginTop: 1,
						}}
					>
						<Text
							style={[
								stylesBlack.placeholderInputSignup,
								this.props.datenaissance !== '' ? { opacity: 1 } : { opacity: 0 },
								{ color: '#6a7989' },
							]}
						>
							Date de naissance (âge minimum : 12 ans)
						</Text>
						{this.renderDatePicker()}
					</View>
					{this.renderPasswordFields()}
				</ScrollView>
				<View style={{ flexDirection: 'row' }}>
					{this.renderButtonAnnuler()}
					{this.renderButton()}
				</View>
				{this.renderFooter()}
				{this.renderModal()}
			</KeyboardAvoidingView>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
