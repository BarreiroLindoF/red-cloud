import React from 'react';
import { connect } from 'react-redux';
import { RkButton, RkText, RkTheme } from 'react-native-ui-kitten';
import { View, KeyboardAvoidingView, ScrollView, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import Modal from 'react-native-modalbox';
import { NavigationActions } from 'react-navigation';
import { api, URL } from '../../rest/api';
import { checkPassword } from '../../common/check';
import LogoHeader from './../../components/avatar/logoHeader';
import stylesBlack from './../../styles/StyleSheetB';

const mapStateToProps = (state) => {
	return {
		email: state.email,
	};
};

class NewPassword extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		headerTitle: <LogoHeader />,
		color: 'white',
		//title: 'Saisie du nouveau mot de passe',
	};

	constructor(props) {
		super(props);
		this.state = {
			code: '',
			newPassword: '',
			newPasswordConfirmed: '',
			apiResponse: '',
			modalVisible: false,
			isFetching: false,
			message: '',
		};
	}

	openLoginWindow() {
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'Login' })],
		});
		this.props.navigation.dispatch(resetAction);
	}

	toogleModal() {
		this.setState({ modalVisible: !this.state.modalVisible });
	}

	checkPasswords() {
		let errorMessage = '';
		if (!checkPassword(this.state.newPassword)) {
			errorMessage = 'Le mot de passe doit avoir au moins 8 caracteres avec 1 chiffre.';
		}
		if (!this.state.newPasswordConfirmed === this.state.newPassword) {
			errorMessage = 'Veuillez entrer 2x le même mot de passe.';
		}
		if (errorMessage === '') {
			this.setState({ isFetching: true });
			api()
				.post(URL.reset, {
					email: this.props.email,
					token: this.props.navigation.state.params.token,
					password: this.state.newPasswordConfirmed,
				})
				.then((response) => {
					this.setState({ isFetching: false, apiResponse: response.data, message: 'Mot de passe modifié' });
					this.toogleModal();
				})
				.catch(() => {
					this.setState({
						isFetching: false,
						modalVisible: true,
						message: 'Problème de connexion au serveur !',
					});
				});
		} else {
			this.setState({ message: errorMessage });
			this.toogleModal();
		}
	}

	renderModal() {
		return (
			<Modal
				style={stylesBlack.modalStyle}
				position={'center'}
				isOpen={this.state.modalVisible}
				backdropOpacity={0.8}
			>
				<RkButton rkType="clear"> {this.state.message} </RkButton>
				<TouchableOpacity
					style={stylesBlack.modalButton}
					onPress={() => {
						this.toogleModal();
						if (this.state.apiResponse.success) {
							this.openLoginWindow();
						}
					}}
				>
					<View>
						<Text style={stylesBlack.btnFont}>Retour</Text>
					</View>
				</TouchableOpacity>
			</Modal>
		);
	}

	renderButtonEnvoyer() {
		if (this.state.isFetching) {
			return <ActivityIndicator size="large" color="#cc0000" style={{ paddingTop: 45 }} />;
		}
		return (
			<RkButton
				rkType="social"
				style={stylesBlack.btnStyle}
				onPress={() => {
					this.checkPasswords();
				}}
			>
				<RkText rkType="awesome hero accentColor" style={stylesBlack.btnFont}>
					Envoyer
				</RkText>
			</RkButton>
		);
	}

	render() {
		return (
			<KeyboardAvoidingView
				style={stylesBlack.mainContentContainer}
				behavior="padding"
				keyboardVerticalOffset={55}
			>
				<View>
					<ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive">
						{this.renderModal()}
						<Hoshi
							label={'Nouveau mot de passe'}
							style={{ marginTop: 150 }}
							borderColor={checkPassword(this.state.newPassword) ? 'grey' : '#ff4444'}
							onChangeText={(newPassword) => {
								this.setState({ newPassword });
							}}
							value={this.state.newPassword}
							secureTextEntry
						/>
						<Hoshi
							label={'Confirmation nouveau mot de passe'}
							style={{ marginTop: 20 }}
							borderColor={
								checkPassword(this.state.newPasswordConfirmed) &&
								this.state.newPasswordConfirmed === this.state.newPassword
									? 'grey'
									: '#ff4444'
							}
							onChangeText={(newPasswordConfirmed) => {
								this.setState({ newPasswordConfirmed });
							}}
							value={this.state.newPasswordConfirmed}
							secureTextEntry
						/>
						{this.renderButtonEnvoyer()}
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

export default connect(mapStateToProps)(NewPassword);
