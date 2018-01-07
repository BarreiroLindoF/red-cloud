import React from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { RkButton, RkText, RkStyleSheet } from 'react-native-ui-kitten';
import { Hoshi } from 'react-native-textinput-effects';

const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
			validationEmail: true,
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
		if (input == this.state.pass) {
			this.setState({ validationPassOk: true });
		} else {
			this.setState({ validationPassOk: false });
		}
	}

	validateEmail(input) {
		if (regEmail.test(input)) {
			this.setState({ validateEmail: true });
		} else {
			this.setState({ validateEmail: false });
		}
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<KeyboardAvoidingView style={styles.screen} behavior="padding" keyboardVerticalOffset={55}>
				<View
					style={{
						flex: 1,
						paddingLeft: 10,
						flexDirection: 'column',
						justifyContent: 'space-between',
					}}
				>
					<ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive">
						<Hoshi label={'Nom'} borderColor={'grey'} />
						<Hoshi label={'Prénom'} borderColor={'grey'} />
						<Hoshi label={'Pseudo'} borderColor={'grey'} />
						<Hoshi
							label={'Email'}
							borderColor={'grey'}
							keyboardType="email-address"
							borderColor={this.state.validationEmail ? 'grey' : '#ff4444'}
							onChangeText={(input) => {
								this.validateEmail(input);
							}}
						/>
						<Hoshi label={'NPA'} borderColor={'grey'} keyboardType="numeric" />
						<Hoshi label={'Ville'} borderColor={'grey'} />
						<Hoshi label={'Date de naissance'} borderColor={'grey'} keyboardType="numeric" />
						<Hoshi
							label={'Mot de passe'}
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
					<RkButton style={{ backgroundColor: 'white' }} rkType="social">
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
			</KeyboardAvoidingView>
		);
	}
}

//eslint-disable-next-line
let styles = RkStyleSheet.create(() => ({
	screen: {
		padding: 10,
		flex: 1,
		backgroundColor: 'black',
		justifyContent: 'space-between',
	},
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
