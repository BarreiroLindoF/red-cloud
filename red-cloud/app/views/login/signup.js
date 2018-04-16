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
	DatePickerAndroid,
} from 'react-native';
import { RkButton, RkText, RkStyleSheet } from 'react-native-ui-kitten';
import { Hoshi } from 'react-native-textinput-effects';
import Modal from 'react-native-modalbox';
import { api, URL } from '../../rest/api';
import * as Action from './../../redux/actions';
import * as Check from './../../common/check';

const styleFile = require('./style/styles');

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

class Signup extends React.Component {
	//eslint-disable-next-line
	static navigationOptions = {
		title: 'Création de ton compte',
	};

	constructor(props) {
		super(props);
		this.state = {
			validationPass: '',
			passOk: false,
			validationPassOk: true,
			validationEmail: false,
			dateOk: false,
			dateNaissance: 'Date de naissance',
			modalVisible: false,
			npa: false,
			msgModal: '',
			isFetching: false,
		};
		this.emailChanged = this.emailChanged.bind(this);
		this.npaChanged = this.npaChanged.bind(this);
		this.datenaissanceChanged = this.datenaissanceChanged.bind(this);
		this.passwordChanged = this.passwordChanged.bind(this);
		this.validationChanged = this.validationChanged.bind(this);
	}

	emailChanged(email) {
		this.setState({ validationEmail: Check.checkEmail(email) }, this.props.updateEmail(email));
	}

	npaChanged(npa) {
		this.setState({ npa: Check.checkNpa(npa) }, this.props.updateNpa(npa));
	}

	datenaissanceChanged(date) {
		this.setState({ dateOk: true }, this.props.updateDateNaissance(date));
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
		api()
			.post(URL.selectUser, {
				email: this.props.email,
				pseudo: this.props.pseudo,
			})
			.then((response) => {
				this.setState({ isFetching: false });
				if (!response.data.success) {
					this.props.navigation.navigate('ListeJeux');
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
		if (this.state.dateOk && this.state.passOk && this.state.validationPassOk && this.state.validationEmail) {
			this.userExist();
		} else {
			this.setState({ msgModal: 'Veuillez vérifier que tous les champs sont correctement remplis.' });
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
				<RkButton rkType="clear">{this.state.msgModal}</RkButton>
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

	renderButtonSuivant() {
		if (this.state.isFetching) {
			return <ActivityIndicator size="large" color="#cc0000" style={{ paddingTop: 15 }} />;
		}
		return (
			<RkButton
				style={{ backgroundColor: 'white' }}
				rkType="social"
				onPress={() => {
					Keyboard.dismiss();
					this.check();
				}}
			>
				<RkText style={{ color: 'black' }}>Suivant</RkText>
			</RkButton>
		);
	}

	async renderDatePicker() {
		try {
			const { action, year, month, day } = await DatePickerAndroid.open({
				// Use `new Date()` for current date.
				// May 25 2020. Month 0 is January.
				mode: 'spinner',
				date: new Date(2010, 1, 12),
			});

			if (action !== DatePickerAndroid.dismissedAction) {
				this.setState({ dateNaissance: day + '.' + month + '.' + year });
				this.datenaissanceChanged(this.state.dateNaissance);
			}
		} catch ({ code, message }) {
			console.warn('Cannot open date picker', message);
		}
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<KeyboardAvoidingView style={styleFile.screen} behavior="padding" keyboardVerticalOffset={55}>
				<View
					style={{
						flex: 1,
						paddingLeft: 10,
						flexDirection: 'column',
						justifyContent: 'space-between',
					}}
				>
					<ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive">
						<Hoshi
							label={'Nom'}
							borderColor={'grey'}
							borderColor={this.props.nom !== '' ? 'grey' : '#ff4444'}
							onChangeText={this.props.updateNom}
						/>
						<Hoshi
							label={'Prénom'}
							borderColor={'grey'}
							borderColor={this.props.prenom !== '' ? 'grey' : '#ff4444'}
							onChangeText={this.props.updatePrenom}
						/>
						<Hoshi
							label={'Pseudo'}
							borderColor={'grey'}
							borderColor={this.props.pseudo !== '' ? 'grey' : '#ff4444'}
							onChangeText={this.props.updatePseudo}
						/>
						<Hoshi
							label={'Email'}
							keyboardType="email-address"
							borderColor={this.state.validationEmail ? 'grey' : '#ff4444'}
							onChangeText={this.emailChanged}
						/>
						<Hoshi
							label={'NPA'}
							borderColor={'grey'}
							keyboardType="phone-pad"
							maxLength={4}
							borderColor={this.state.npa ? 'grey' : '#ff4444'}
							onChangeText={this.npaChanged}
						/>
						<Hoshi
							label={'Ville'}
							borderColor={'grey'}
							borderColor={this.props.ville !== '' ? 'grey' : '#ff4444'}
							onChangeText={this.props.updateVille}
						/>
						<View
							style={{
								backgroundColor: 'black',
								height: 50,
								borderBottomColor: '#b9c1ca',
								borderBottomWidth: 2,
							}}
						>
							<RkButton
								style={{
									backgroundColor: 'black',
									width: '100%',
									justifyContent: 'flex-start',
								}}
								onPress={() => {
									this.renderDatePicker();
								}}
							>
								<Text
									style={{
										color: '#6a7989',
										paddingLeft: '0.5%',
										fontSize: 16,
									}}
								>
									{' '}
									{this.state.dateNaissance}{' '}
								</Text>
							</RkButton>
						</View>

						<Hoshi
							label={'Mot de passe (8 caractères dont 1 chiffre)'}
							borderColor={this.state.passOk ? 'grey' : '#ff4444'}
							onChangeText={this.passwordChanged}
							secureTextEntry
						/>
						<Hoshi
							label={'Validation mot de passe'}
							borderColor={this.state.validationPassOk ? 'grey' : '#ff4444'}
							onChangeText={this.validationChanged}
							secureTextEntry
						/>
					</ScrollView>
				</View>
				<View style={styles.save}>{this.renderButtonSuivant()}</View>
				<View style={styles.footer}>
					<View style={styles.textRow}>
						<RkText style={{ color: 'white' }} rkType="primary3">
							Vous avez déjà un compte ?
						</RkText>
						<RkButton
							rkType="clear"
							onPress={() => {
								navigate('Login');
							}}
						>
							<RkText style={{ color: '#cc0000' }}> Connectez-vous ici </RkText>
						</RkButton>
					</View>
				</View>
				{this.renderModal()}
			</KeyboardAvoidingView>
		);
	}
}

//eslint-disable-next-line
let styles = RkStyleSheet.create(() => ({
	save: {
		marginTop: 25,
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	footer: {
		justifyContent: 'flex-end',
		marginBottom: 5,
	},
	textRow: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
}));

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
