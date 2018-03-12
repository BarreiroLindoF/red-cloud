import React from 'react';
import { connect } from 'react-redux';
import { RkButton, RkText, RkTheme } from 'react-native-ui-kitten';
import { View, KeyboardAvoidingView, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import Modal from 'react-native-modalbox';
import { api, URL } from '../../rest/api';
import { checkCodePassword } from '../../common/check';

const styleFile = require('./style/styles');

const mapStateToProps = (state) => {
	return {
		email: state.email,
	};
};

class Code extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		title: 'Mail envoyé',
	};

	constructor(props) {
		super(props);
		this.state = {
			code: '',
			modalVisible: false,
			message: '',
			token: '',
		};
	}

	sendNewPassword() {
		api()
			.post(URL.passwordRecovery, {
				email: this.props.email,
			})
			.then((response) => {
				this.setState({
					token: response.data.payload,
					message: response.data.message,
				});
				this.toogleModal();
			});
	}

	openNewPasswordWindow() {
		this.props.navigation.navigate('NewPassword', {
			token: this.state.token,
		});
	}

	toogleModal() {
		this.setState({ modalVisible: !this.state.modalVisible });
	}

	checkCode() {
		api()
			.post(URL.code, {
				email: this.props.email,
				code: this.state.code,
			})
			.then((response) => {
				if (response.data.success) {
					this.setState({
						message: 'Code valide',
						token: response.data.payload,
					});
				} else {
					this.setState({ message: 'Code invalide' });
				}
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
				<RkButton rkType="clear">{this.state.message} </RkButton>
				<TouchableOpacity
					style={[styleFile.buttonConditions, { marginTop: 20, borderRadius: 5 }]}
					onPress={() => {
						this.toogleModal();
						if (this.state.token !== '') {
							this.openNewPasswordWindow();
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
							label={'Code (6 caractères)'}
							style={{ marginTop: 150 }}
							borderColor={checkCodePassword(this.state.code) ? 'grey' : '#ff4444'}
							onChangeText={(code) => {
								this.setState({ code });
							}}
							value={this.state.code}
						/>
						<RkButton
							rkType="social"
							style={styles.buttonSend}
							onPress={() => {
								this.checkCode();
							}}
						>
							<RkText rkType="awesome hero accentColor" style={{ color: 'white' }}>
								Envoyer
							</RkText>
						</RkButton>
						<RkText
							style={{
								color: 'white',
								marginTop: 50,
								marginLeft: 50,
							}}
						>
							Pensez à consulter vos spams ou{' '}
						</RkText>
						<RkButton
							rkType="clear"
							style={{}}
							onPress={() => {
								this.sendNewPassword();
							}}
						>
							<RkText rkType="header6" style={{ color: 'red' }}>
								renvoyer un nouveau code
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

export default connect(mapStateToProps)(Code);
