import React from 'react';
import { connect } from 'react-redux';
import { RkButton, RkText, RkTheme } from 'react-native-ui-kitten';
import { View, KeyboardAvoidingView, ScrollView, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import { api, URL } from './../../rest/api';
import Modal from 'react-native-modalbox';
import { updatePseudo, updatePassword, userLogin } from './../../redux/actions';
import stylesBlack from './../../styles/StyleSheetB';

const mapStateToProps = (state) => {
	return {
		pseudo: state.pseudo,
		password: state.password,
	};
};

const mapDispatchToProps = (dispatch) => ({
	updatePseudo: (pseudo) => {
		dispatch(updatePseudo(pseudo));
	},
	updatePassword: (password) => {
		dispatch(updatePassword(password));
	},
	userLogin: (user) => {
		dispatch(userLogin(user));
	},
});

class RecupMotDePasse extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props);
		this.state = {
			eMail: '',
			modalVisible: false,
			apiResponse: '',
			isFetching: false,
			modalMessage: '',
			mailInexistant: false,
		};
	}

	checkEmail() {
		this.setState({ isFetching: true });
		api()
			.post(URL.passwordRecovery, {
				user: this.state.eMail,
			})
			.then((response) => {
				console.log(response.data.success);
				this.setState({
					isFetching: false,
					apiResponse: response.data,
					mailInexistant: !response.data.success,
				});
				this.props.updateEmail(this.state.apiResponse.payload);
			})
			.catch(() => {
				this.setState({
					modalVisible: true,
					modalMessage: 'Problème de connexion au serveur !',
					isFetching: false,
				});
			});
	}

	renderButtonEnvoyer() {
		if (this.state.isFetching) {
			return <ActivityIndicator size="large" color="#cc0000" />;
		}
		return (
			<RkButton
				rkType="social"
				onPress={() => {
					this.checkEmail();
				}}
				style={stylesBlack.btnStyle}
			>
				<RkText rkType="awesome hero accentColor" style={stylesBlack.btnFont}>
					Envoyer
				</RkText>
			</RkButton>
		);
	}

	render() {
		return (
			<Modal
				style={stylesBlack.modalStyle}
				position={'center'}
				isOpen={this.props.open}
				backdropOpacity={0.95}
				swipeToClose={false}
				backdropPressToClose={false}
			>
				<View style={{ justifyContent: 'center', height: '100%', width: '80%' }}>
					<Hoshi
						label={'E-Mail ou Username'}
						style={{ flexDirection: 'column' }}
						borderColor={this.state.eMail !== '' ? 'grey' : '#ff4444'}
						onChangeText={(eMail) => {
							this.setState({ eMail });
						}}
						value={this.state.eMail}
					/>
					{this.state.mailInexistant && (
						<Text style={{ color: 'red', margin: 10 }}>Email ou pseudo inexistant</Text>
					)}
					<View style={stylesBlack.btnPosition}>
						<RkButton
							rkType="social"
							onPress={() => {
								this.setState({ mailInexistant: false });
								this.props.closeModal();
							}}
							style={[stylesBlack.btnStyle, { marginRight: 25 }]}
						>
							<RkText rkType="awesome hero accentColor" style={stylesBlack.btnFont}>
								Annuler
							</RkText>
						</RkButton>
						{this.renderButtonEnvoyer()}
					</View>
				</View>
			</Modal>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RecupMotDePasse);
