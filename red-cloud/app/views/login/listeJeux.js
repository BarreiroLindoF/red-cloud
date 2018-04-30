import React from 'react';
import { connect } from 'react-redux';
import {
	View,
	ScrollView,
	KeyboardAvoidingView,
	Text,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import { RkText, RkButton } from 'react-native-ui-kitten';
import CheckBox from 'react-native-check-box';
import Modal from 'react-native-modalbox';
import { NavigationActions } from 'react-navigation';
import { updateConditions, updateToken } from './../../redux/actions';
import { api, URL } from '../../rest/api';
import LogoHeader from './../../components/avatar/logoHeader';

const styleFile = require('./style/styles');

const mapStateToProps = (state) => ({
	nom: state.nom,
	prenom: state.prenom,
	pseudo: state.pseudo,
	email: state.email,
	npa: state.npa,
	ville: state.ville,
	datenaissance: state.datenaissance,
	password: state.password,
	conditions: state.conditions,
});

const mapDispatchToProps = (dispatch) => ({
	changerConditions: (conditions) => {
		dispatch(updateConditions(conditions));
	},
	updateToken: (token) => {
		dispatch(updateToken(token));
	},
});

class ListeJeux extends React.Component {
	//eslint-disable-next-line
	static navigationOptions = ({ navigation } = {
		headerTitle: <LogoHeader />,
		color: 'white',
		//title: 'Création de ton compte',
		condition: false,
	});

	constructor(props) {
		super(props);
		this.state = {
			checkBoxes: [
				'Counter Strike',
				'Dofus',
				'Fortnite',
				'Mario Kart',
				"PlayerUnknown's Battelgrounds",
				'World of Warcraft',
				'Fifa 2018',
				'League of Legends',
			],
			checkedByUser: [],
			modalVisible: false,
			modalMessage: '',
			isFetching: false,
			userCreated: false,
		};
	}

	onClick(data) {
		const checkTable = this.state.checkedByUser.find((element) => {
			return element === data;
		});
		if (checkTable === undefined) {
			this.state.checkedByUser.push(data);
		}
	}

	toogleModal() {
		this.setState({ modalVisible: !this.state.modalVisible });
	}

	createUser() {
		if (!this.props.conditions) {
			this.setState({
				modalMessage: 'Merci de bien vouloir accepter les condtions avant de finaliser votre compte.',
				modalVisible: true,
			});
			return;
		}
		this.setState({ isFetching: true });
		api()
			.post(URL.register, {
				nom: this.props.nom,
				prenom: this.props.prenom,
				pseudo: this.props.pseudo,
				email: this.props.email,
				npa: this.props.npa,
				ville: this.props.ville,
				datenaissance: this.props.datenaissance,
				password: this.props.password,
			})
			.then((reponse) => {
				if (reponse.data.success) {
					api()
						.post(URL.login, {
							pseudo: this.props.pseudo,
							password: this.props.password,
						})
						.then((response) => {
							this.setState({ isFetching: false });
							if (response.data.success) {
								this.props.updateToken(response.data.payload);
								this.setState({
									userCreated: true,
									modalMessage:
										'Votre compte a été crée avec succès ! Vous allez être redirigé vers la liste des tournois.',
									modalVisible: true,
								});
							}
						})
						.catch(() => {
							this.setState({
								isFetching: false,
								userCreated: false,
								modalMessage: 'Problème de connexion au serveur !',
								modalVisible: true,
							});
						});
				}
			})
			.catch((error) => {
				this.setState({ isFetching: false });
				console.log(error);
			});
	}

	openEvents() {
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'Tabs' })],
		});
		this.props.navigation.dispatch(resetAction);
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
				<RkButton rkType="clear">{this.state.modalMessage}</RkButton>
				<TouchableOpacity
					style={[styleFile.buttonConditions, { marginTop: 20, borderRadius: 5 }]}
					onPress={() => {
						if (this.state.userCreated) {
							this.openEvents();
						}
						this.toogleModal();
					}}
				>
					<View>
						<Text>Continuer</Text>
					</View>
				</TouchableOpacity>
			</Modal>
		);
	}

	renderCheckboxes() {
		return this.state.checkBoxes.map((checkbox, index) => (
			<CheckBox
				key={index}
				style={{ flex: 1, padding: 10 }}
				leftText={this.state.checkBoxes[index]}
				leftTextStyle={{ color: 'grey' }}
				onClick={() => this.onClick(this.state.checkBoxes[index])}
				checkBoxColor="white"
			/>
		));
	}

	renderSuivant() {
		if (this.state.isFetching) {
			return (
				<View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 35 }}>
					<ActivityIndicator size="large" color="#cc0000" style={{ paddingTop: 15 }} />
				</View>
			);
		}
		return (
			<View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 35 }}>
				<RkButton
					style={{ backgroundColor: 'white' }}
					rkType="social"
					onPress={() => {
						this.createUser();
					}}
				>
					<RkText style={{ color: 'black' }}>Suivant</RkText>
				</RkButton>
			</View>
		);
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<KeyboardAvoidingView style={styleFile.screen} behavior="padding" keyboardVerticalOffset={55}>
				<RkText style={{ color: 'grey', paddingTop: 20, paddingBottom: 25 }} rkType="primary3">
					Sélectionnez vos jeux favoris :
				</RkText>
				<View
					style={{
						flex: 1,
						paddingLeft: 10,
						paddingBottom: 20,
					}}
				>
					<ScrollView>{this.renderCheckboxes()}</ScrollView>
				</View>
				<View style={{ flexDirection: 'row', paddingLeft: 25, paddingBottom: 40, paddingRight: 9 }}>
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ color: 'grey' }}>Accepter les </Text>
						<Text
							onPress={() => {
								navigate('Conditions');
							}}
							style={{ color: 'red' }}
						>
							conditions générales{' '}
						</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'flex-end',
							flex: 1,
						}}
					>
						<CheckBox
							right
							onClick={() => {
								this.props.changerConditions(!this.props.conditions);
							}}
							checkBoxColor="white"
							isChecked={this.props.conditions}
						/>
					</View>
				</View>
				{this.renderModal()}
				{this.renderSuivant()}
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'black',
	},
	innerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(ListeJeux);
