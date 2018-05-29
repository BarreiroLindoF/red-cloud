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
	Animated,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { RkButton, RkText, RkStyleSheet } from 'react-native-ui-kitten';
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

	componentWillMount() {
		if (!this.state.isSigningUp) {
			this.npaChanged(this.props.npa);
			this.emailChanged(this.props.email);
			this.setState({ datenaissance: this.props.datenaissance });
			this.saveReduxState();
			BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
		}
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
	}

	handleBackButtonClick() {
		this.annulerModification();
		return false;
	}

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

	emailChanged(email) {
		this.setState({ validationEmail: Check.checkEmail(email) }, this.props.updateEmail(email));
	}

	npaChanged(npa) {
		this.setState({ npa: Check.checkNpa(npa) }, this.props.updateNpa(npa));
	}

	getAge(year, month, day) {
		const today = new Date();
		const birthDate = new Date(year, month, day);
		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

	passwordChanged(password) {
		this.setState({
			passOk: Check.checkPassword(password),
			validationPassOk: password === this.state.validationPass,
		});
		this.props.updatePassword(password);
	}

	validationChanged(validation) {
		this.setState({
			validationPass: validation,
			validationPassOk: this.props.password === validation,
		});
	}

	toogleModal() {
		this.setState({ modalVisible: !this.state.modalVisible });
	}

	userExist() {
		this.setState({ isFetching: true });
		const connexion = api();
		connexion.defaults.timeout = 10000;
		connexion
			.post(URL.selectUser, {
				email: this.props.email,
				pseudo: this.props.pseudo,
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

	sauvegarder() {
		if (this.state.dateOk && this.state.validationEmail && this.state.npa) {
			// send request
			this.setState({ isFetching: true });
			api()
				.patch(URL.modifierUtilisateur, {
					prenom: this.props.prenom,
					nom: this.props.nom,
					pseudo: this.props.pseudo,
					ville: this.props.ville,
					npa: this.props.npa,
					datenaissance: this.props.datenaissance,
					email: this.props.email,
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

	annulerModification() {
		this.props.updatePrenom(oldReduxState.prenom);
		this.props.updateNom(oldReduxState.nom);
		this.props.updatePseudo(oldReduxState.pseudo);
		this.props.updateVille(oldReduxState.ville);
		this.props.updateNpa(oldReduxState.npa);
		this.props.updateDateNaissance(oldReduxState.datenaissance);
		this.props.updateEmail(oldReduxState.email);
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

	renderDatePicker() {
		return (
			<DatePicker
				style={{ width: '100%', paddingBottom: 1 }}
				mode="date"
				date={this.props.datenaissance ? this.props.datenaissance : this.state.dateNaissance}
				androidMode="spinner"
				placeholder="Date de naissance"
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
					{console.log(this.props.nom !== '')}
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
							Date de naissance
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
