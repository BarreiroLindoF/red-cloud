import React from 'react';
import { connect } from 'react-redux';
import { RkButton, RkText, RkTheme } from 'react-native-ui-kitten';
import { View, KeyboardAvoidingView, ScrollView, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import Modal from 'react-native-modalbox';
import { api, URL } from './../../rest/api';
import { updateEmail } from '../../redux/actions';
import LogoHeader from './../../components/avatar/logoHeader';
import stylesBlack from './../../styles/StyleSheetB';

const styleFile = require('./style/styles');

const mapStateToProps = (state) => {
	return {
		email: state.email,
	};
};

const mapDispatchToProps = (dispatch) => ({
	updateEmail: (email) => {
		dispatch(updateEmail(email));
	},
});

class PasswordRecovery extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		headerTitle: <LogoHeader />,
		color: 'white',
		//title: 'Saisie du mail ou du username',
	};

	constructor(props) {
		super(props);
		this.state = {
			eMail: '',
			modalVisible: false,
			apiResponse: '',
			isFetching: false,
		};
	}

	openCodeWindow() {
		this.props.navigation.navigate('Code');
	}

	toogleModal() {
		this.setState({ modalVisible: !this.state.modalVisible });
	}

	checkEmail() {
		this.setState({ isFetching: true });
		api()
			.post(URL.passwordRecovery, {
				user: this.state.eMail,
			})
			.then((response) => {
				this.setState({ isFetching: false, apiResponse: response.data });
				this.props.updateEmail(this.state.apiResponse.payload);
				this.toogleModal();
			})
			.catch((error) => {
				console.error(error);
				this.setState({ isFetching: false });
			});
	}

	renderModal() {
		return (
			<Modal
				style={stylesBlack.modalStyle}
				position={'center'}
				isOpen={this.state.modalVisible}
				backdropOpacity={0.8}
			>
				<RkButton rkType="clear">{this.state.apiResponse.message}</RkButton>
				<TouchableOpacity
					style={stylesBlack.modalButton}
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

	renderButtonEnvoyer() {
		if (this.state.isFetching) {
			return <ActivityIndicator size="large" color="#cc0000" style={{ paddingTop: 45 }} />;
		}
		return (
			<View style={stylesBlack.btnPosition}>
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
			</View>
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
					<Text style={stylesBlack.title}>Mot de passe oublié?</Text>
				</View>
				<View style={stylesBlack.scrollViewContainer}>
					<ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive">
						{this.renderModal()}
						<Hoshi
							label={'E-Mail ou Username'}
							style={{ flexDirection: 'column' }}
							borderColor={this.state.eMail !== '' ? 'grey' : '#ff4444'}
							onChangeText={(eMail) => {
								this.setState({ eMail });
							}}
							value={this.state.eMail}
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

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecovery);
