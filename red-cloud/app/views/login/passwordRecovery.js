import React from 'react';
import { RkButton, RkText, RkTheme } from 'react-native-ui-kitten';
import { View, KeyboardAvoidingView, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import Modal from 'react-native-modalbox';
import { password } from '../../rest/httpRequest';

const styleFile = require('./style/styles');

export class PasswordRecovery extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		title: 'Saisie du mail ou du username',
	};

	constructor(props) {
		super(props);
		this.state = {
			eMail: '',
			modalVisible: false,
			apiResponse: '',
		};
	}

	openCodeWindow() {
		this.props.navigation.navigate('Code', { eMail: this.state.apiResponse.payload });
	}

	toogleModal() {
		this.setState({ modalVisible: !this.state.modalVisible });
	}

	checkEmail() {
		password(this.state.eMail).then((response) => {
			this.setState({ apiResponse: response });
			this.toogleModal();
		});
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
				<RkButton rkType="clear">{this.state.apiResponse.message}</RkButton>
				<TouchableOpacity
					style={[styleFile.buttonConditions, { marginTop: 20, borderRadius: 5 }]}
					onPress={() => {
						this.toogleModal();
						if (this.state.apiResponse.success) {
							this.openCodeWindow();
						}
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
			<KeyboardAvoidingView style={styles.screen} behavior="padding" keyboardVerticalOffset={55}>
				<View>
					<ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive">
						{this.renderModal()}
						<Hoshi
							label={'E-Mail ou Username'}
							style={{ marginTop: 150 }}
							onChangeText={(eMail) => {
								this.setState({ eMail });
							}}
							value={this.state.eMail}
						/>
						<RkButton
							rkType="social"
							style={styles.buttonSend}
							onPress={() => {
								this.checkEmail();
							}}
						>
							<RkText rkType="awesome hero accentColor" style={{ color: 'white' }}>
								Envoyer
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

let styles = {
	font: {
		height: 60,
		marginHorizontal: 50,
		color: 'white',
	},
	screen: {
		padding: 10,
		flex: 1,
		backgroundColor: 'black',
	},
	footer: {
		justifyContent: 'flex-end',
		flex: 1,
	},
	buttonSend: {
		backgroundColor: 'red',
		marginLeft: 50,
		marginTop: 50,
		width: 250,
	},
	save: {
		marginVertical: 9,
	},
	textRow: {
		justifyContent: 'center',
		flexDirection: 'row',
	},
};
