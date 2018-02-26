import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Text, Keyboard } from 'react-native';
import { RkButton, RkText, RkStyleSheet } from 'react-native-ui-kitten';
import { Hoshi } from 'react-native-textinput-effects';
import Modal from 'react-native-modalbox';
import { selectUser } from '../../rest/httpRequest';

const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regDate = /([0-2]\d{1}|3[0-1])\.(0\d{1}|1[0-2])\.(19|20)\d{2}/;
const regNpa = /[1][0-9][0-9][0-9]/;
const styleFile = require('./style/styles');

export class Signup extends React.Component {
	//eslint-disable-next-line
	static navigationOptions = {
		title: 'Création de ton compte',
	};

	constructor(props) {
		super(props);
		this.state = {
			pass: '',
			validationPass: '',
			passOk: false,
			validationPassOk: true,
			validationEmail: false,
			email: '',
			dateOk: false,
			dateNaissance: '',
			modalVisible: false,
			name: '',
			firstName: '',
			userName: '',
			npa: false,
			npaValue: '',
			ville: '',
			msgModal: '',
		};
	}

	validate(input) {
		this.setState({ pass: input });
		this.compareMdp(this.state.validationPass);
		if (regPassword.test(input)) {
			this.setState({ passOk: true });
		} else {
			this.setState({ passOk: false });
		}
	}

	compareMdp(input) {
		this.setState({ validationPass: input });
		if (input === this.state.pass) {
			this.setState({ validationPassOk: true });
		} else {
			this.setState({ validationPassOk: false });
		}
	}

	validateEmail(input) {
		if (regEmail.test(input)) {
			this.setState({ validationEmail: true });
			this.setState({ email: input });
		} else {
			this.setState({ validationEmail: false });
		}
	}

	validateDate(input) {
		if (regDate.test(input)) {
			this.setState({ dateOk: true });
			this.setState({ dateNaissance: input });
		} else {
			this.setState({ dateOk: false });
		}
	}

	toogleModal() {
		this.setState({ modalVisible: !this.state.modalVisible });
	}

	userExist() {
		selectUser(this.state.email).then((reponse) => {
			if (!reponse.success) {
				selectUser(this.state.userName).then((reponseUser) => {
					if (!reponseUser.success) {
						this.props.navigation.navigate('ListeJeux', {
							condition: false,
							nom: this.state.name,
							prenom: this.state.firstName,
							pseudo: this.state.userName,
							email: this.state.email,
							npa: this.state.npaValue,
							ville: this.state.ville,
							datenaissance: this.state.dateNaissance,
							pass: this.state.pass,
						});
					} else {
						this.setState({ msgModal: 'Pseudo ou email déjà existant dans la bdd' });
						this.toogleModal();
					}
				});
			} else {
				this.setState({ msgModal: 'Pseudo ou email déjà existant dans la bdd' });
				this.toogleModal();
			}
		});
	}

	check() {
		if (this.state.dateOk && this.state.passOk && this.state.validationPassOk && this.state.validationEmail) {
			if (
				this.state.name !== '' &&
				this.state.firstName !== '' &&
				this.state.userName !== '' &&
				this.state.npa &&
				this.state.ville !== ''
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
							borderColor={this.state.name !== '' ? 'grey' : '#ff4444'}
							onChangeText={(input) => {
								this.setState({ name: input });
							}}
						/>
						<Hoshi
							label={'Prénom'}
							borderColor={'grey'}
							borderColor={this.state.firstName !== '' ? 'grey' : '#ff4444'}
							onChangeText={(input) => {
								this.setState({ firstName: input });
							}}
						/>
						<Hoshi
							label={'Pseudo'}
							borderColor={'grey'}
							borderColor={this.state.userName !== '' ? 'grey' : '#ff4444'}
							onChangeText={(input) => {
								this.setState({ userName: input });
							}}
						/>
						<Hoshi
							label={'Email'}
							keyboardType="email-address"
							borderColor={this.state.validationEmail ? 'grey' : '#ff4444'}
							onChangeText={(input) => {
								this.validateEmail(input);
							}}
						/>
						<Hoshi
							label={'NPA'}
							borderColor={'grey'}
							keyboardType="phone-pad"
							maxLength={4}
							borderColor={this.state.npa ? 'grey' : '#ff4444'}
							onChangeText={(input) => {
								this.setState({ npa: regNpa.test(input) });
								this.setState({ npaValue: input });
							}}
						/>
						<Hoshi
							label={'Ville'}
							borderColor={'grey'}
							borderColor={this.state.ville !== '' ? 'grey' : '#ff4444'}
							onChangeText={(input) => {
								this.setState({ ville: input });
							}}
						/>
						<Hoshi
							maxLength={10}
							borderColor={this.state.dateOk ? 'grey' : '#ff4444'}
							label={'Date de naissance (JJ.MM.AAAA)'}
							keyboardType="numeric"
							onChangeText={(input) => {
								this.validateDate(input);
							}}
						/>
						<Hoshi
							label={'Mot de passe (8 caractères dont 1 chiffre)'}
							borderColor={this.state.passOk ? 'grey' : '#ff4444'}
							onChangeText={(input) => {
								this.validate(input);
							}}
							secureTextEntry
						/>
						<Hoshi
							label={'Validation mot de passe'}
							borderColor={this.state.validationPassOk ? 'grey' : '#ff4444'}
							onChangeText={(input) => {
								this.compareMdp(input);
							}}
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
