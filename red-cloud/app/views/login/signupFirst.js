import React from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { RkButton, RkText, RkTextInput, RkStyleSheet, RkTheme } from 'react-native-ui-kitten';

export class SignupFirst extends React.Component {
	//eslint-disable-next-line
	static navigationOptions = {
		title: 'Création de ton compte',
	};

	constructor(props) {
		super(props);
		this.state = {
			pass: '',
			validationPass: '',
		};
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<KeyboardAvoidingView style={styles.screen} behavior="padding" keyboardVerticalOffset={55}>
				<View style={{ flex: 2 }}>
					<ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive">
						<RkTextInput rkType="success" placeholder="Nom" />
						<RkTextInput rkType="success" placeholder="Prénom" />
						<RkTextInput rkType="success" placeholder="Pseudo" />
						<RkTextInput rkType="success" placeholder="Ville" />
						<RkTextInput rkType="success" placeholder="NPA" keyboardType="numeric" />
						<RkTextInput rkType="success" placeholder="Date de naissance" keyboardType="numeric" />
						<RkTextInput rkType="success" placeholder="Email" keyboardType="email-address" />
						<RkTextInput
							rkType="success"
							placeholder="Password"
							secureTextEntry
							onChangeText={(text) => {
								this.setState({ pass: text });
							}}
						/>
						<RkTextInput
							style={styles.font}
							rkType="success"
							placeholder="Confirm Password"
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

RkTheme.setType('RkTextInput', 'success', {
	labelColor: 'grey',
	underlineColor: 'grey',
	underlineWidth: 2,
	placeholderTextColor: 'grey',
	color: 'white',
});

//eslint-disable-next-line
let styles = RkStyleSheet.create(() => ({
	screen: {
		padding: 10,
		flex: 1,
		justifyContent: 'space-around',
		backgroundColor: 'black',
	},
	content: {
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
