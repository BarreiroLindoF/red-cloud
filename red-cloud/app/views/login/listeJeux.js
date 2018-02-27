import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, KeyboardAvoidingView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RkText, RkButton } from 'react-native-ui-kitten';
import CheckBox from 'react-native-check-box';
import Modal from 'react-native-modalbox';
import { updateConditions } from './../../redux/actions';
import { register, login } from '../../rest/httpRequest';

const styleFile = require('./style/styles');

const mapStateToProps = (state) => ({
	conditions: state.conditions,
});

const mapDispatchToProps = (dispatch) => ({
	changerConditions: (conditions) => {
		dispatch(updateConditions(conditions));
	},
});

class ListeJeux extends React.Component {
	//eslint-disable-next-line
	static navigationOptions = ({ navigation } = {
		title: 'Création de ton compte',
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
			conditionsAccepted: false,
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
		register(
			this.props.navigation.state.params.nom,
			this.props.navigation.state.params.prenom,
			this.props.navigation.state.params.pseudo,
			this.props.navigation.state.params.email,
			this.props.navigation.state.params.npa,
			this.props.navigation.state.params.ville,
			this.props.navigation.state.params.datenaissance,
			this.props.navigation.state.params.pass,
		).then((reponse) => {
			if (reponse.success) {
				login(this.props.navigation.state.params.pseudo, this.props.navigation.state.params.pass).then(
					(response) => {
						if (response.payload != null) {
							this.props.navigation.navigate('Tournois', { token: response.payload });
						}
					},
				);
			}
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
				onClosed={() => {
					return this.props.conditions ? this.createUser() : '';
				}}
			>
				<RkButton rkType="clear">
					{this.props.conditions
						? 'Votre compte a été crée avec succès ! Vous allez être redirigé vers la liste des tournois.'
						: 'Merci de bien vouloir accepter les condtions avant de finaliser votre compte.'}
				</RkButton>
				<TouchableOpacity
					style={[styleFile.buttonConditions, { marginTop: 20, borderRadius: 5 }]}
					onPress={() => {
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
								//this.setState({ conditionsAccepted: !this.state.conditionsAccepted });
							}}
							checkBoxColor="white"
							isChecked={this.props.conditions}
						/>
					</View>
				</View>
				{this.renderModal()}
				<View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 35 }}>
					<RkButton
						style={{ backgroundColor: 'white' }}
						rkType="social"
						onPress={() => {
							this.toogleModal();
						}}
					>
						<RkText style={{ color: 'black' }}>Suivant</RkText>
					</RkButton>
				</View>
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
