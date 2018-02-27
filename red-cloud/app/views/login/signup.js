import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Text, Keyboard } from 'react-native';
import { RkButton, RkText, RkStyleSheet } from 'react-native-ui-kitten';
import { Hoshi } from 'react-native-textinput-effects';
import Modal from 'react-native-modalbox';
import { selectUser } from '../../rest/httpRequest';
import * as Action from './../../redux/actions';

const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const regEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const regDate = /([0-2]\d{1}|3[0-1])\.(0\d{1}|1[0-2])\.(19|20)\d{2}/;
const regNpa = /[1][0-9][0-9][0-9]/;
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
			modalVisible: false,
			npa: false,
			msgModal: '',
		};
		this.emailChanged = this.emailChanged.bind(this);
		this.npaChanged = this.npaChanged.bind(this);
		this.datenaissanceChanged = this.datenaissanceChanged.bind(this);
		this.passwordChanged = this.passwordChanged.bind(this);
		this.validationChanged = this.validationChanged.bind(this);
	}

	emailChanged(email) {
		this.setState({ validationEmail: regEmail.test(email) }, this.props.updateEmail(email));
	}

	npaChanged(npa) {
		this.setState({ npa: regNpa.test(npa) }, this.props.updateNpa(npa));
	}

	datenaissanceChanged(date) {
		this.setState({ dateOk: regDate.test(date) }, this.props.updateDateNaissance(date));
	}

	passwordChanged(password) {
		this.setState({
			passOk: regPassword.test(password),
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
		selectUser(this.props.email, this.props.pseudo).then((reponse) => {
			if (!reponse.success) {
				this.props.navigation.navigate('ListeJeux');
			} else {
				this.setState({ msgModal: reponse.message });
				this.toogleModal();
			}
		});
	}

	check() {
		if (this.state.dateOk && this.state.passOk && this.state.validationPassOk && this.state.validationEmail) {
			if (
				this.props.nom !== '' &&
				this.props.prenom !== '' &&
				this.props.pseudo !== '' &&
				this.props.npa &&
				this.props.ville !== ''
			) {
				this.userExist();
			} else {
				this.setState({ msgModal: 'Veuillez vérifier que tous les champs sont correctement remplis.' });
				this.toogleModal();
			}
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
						<Hoshi
							maxLength={10}
							borderColor={this.state.dateOk ? 'grey' : '#ff4444'}
							label={'Date de naissance (JJ.MM.AAAA)'}
							keyboardType="numeric"
							onChangeText={this.datenaissanceChanged}
						/>
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
				<View style={styles.save}>
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
				</View>
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
							<RkText style={{ color: 'red' }}> Connectez-vous ici </RkText>
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
