import React from 'react';
import { RkButton, RkText, RkTheme } from 'react-native-ui-kitten';
import { Text, View, KeyboardAvoidingView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import Modal from 'react-native-modalbox';
import { StatusBarPadding } from './../../config/header';
import * as Check from './../../common/check';
import { api, URL } from './../../rest/api';

const styleFile = require('./styles');

class Inscription extends React.Component {
	// eslint-disable-next-line
	/*static navigationOptions = {
		header: null,
	};*/

	constructor(props) {
		super(props);
		this.state = {
			nomCarte: '',
			noCarte: null,
			troisChiffres: null,
			moisCarte: null,
			anneeCarte: null,
			modalVisible: false,
			errorMessage: '',
			isFetching: false,
			inscriptionFaite: false,
		};
	}

	inscription() {
		const url = URL.inscription.replace('{$id}', this.props.navigation.state.params.idTournoi);
		this.setState({ isFetching: true });
		api()
			.post(url, {
				nom_equipe: this.props.navigation.state.params.nomEquipe,
				nom_carte: this.state.nomCarte,
				no_carte: this.state.noCarte,
				mois_carte: this.state.moisCarte,
				annee_carte: this.state.anneeCarte,
			})
			.then((response) => {
				if (response.data.success) {
					this.setState({
						inscriptionFaite: true,
						errorMessage: 'Inscription validée!',
						modalVisible: true,
					});
				} else {
					this.setState({
						isFetching: false,
						errorMessage: response.data.message,
						modalVisible: true,
					});
				}
			})
			.catch(() => {
				this.setState({
					isFetching: false,
					errorMessage: "Problème de connexion au serveur lors de l'inscription",
					modalVisible: true,
				});
			});
	}

	toggleModal() {
		this.setState({ modalVisible: !this.state.modalVisible });
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
				<RkButton rkType="clear">{this.state.errorMessage}</RkButton>
				<TouchableOpacity
					style={[styleFile.buttonConditions, { marginTop: 20, borderRadius: 5 }]}
					onPress={() => {
						this.toggleModal();
						if (this.state.inscriptionFaite) {
							this.props.navigation.navigate('Tabs');
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

	renderButtonInscrire() {
		if (this.state.isFetching) {
			return <ActivityIndicator size="large" color="white" style={{ paddingTop: 15 }} />;
		}
		return (
			<RkButton
				rkType="social"
				style={styles.buttonSignIn}
				onPress={() => {
					this.inscription();
				}}
			>
				<RkText rkType="awesome hero accentColor">S'inscrire</RkText>
			</RkButton>
		);
	}

	render() {
		return (
			<KeyboardAvoidingView style={styles.screen} behavior="padding" keyboardVerticalOffset={55}>
				{this.renderModal()}
				<View style={styles.container}>
					<View style={styles.rubanHaut}>
						<Text style={styles.title}>Inscription</Text>
					</View>
					<ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive">
						<Hoshi
							label={'Nom sur la carte'}
							rkType="textInputLogin"
							onChangeText={(nomCarte) => {
								this.setState({ nomCarte });
							}}
							borderColor={this.state.nomCarte !== '' ? 'grey' : '#ff4444'}
							value={this.state.nomCarte}
						/>
						<Hoshi
							label={'Numéro de la carte de crédit'}
							rkType="textInputLogin"
							onChangeText={(noCarte) => {
								this.setState({ noCarte });
							}}
							borderColor={Check.checkNumeroCarte(this.state.noCarte) ? 'grey' : '#ff4444'}
							value={this.state.noCarte}
						/>
						<Hoshi
							label={'Les 3 chiffres derrière la carte'}
							rkType="textInputLogin"
							onChangeText={(troisChiffres) => {
								this.setState({ troisChiffres });
							}}
							borderColor={Check.checkTroisChiffresCarte(this.state.troisChiffres) ? 'grey' : '#ff4444'}
							value={this.state.troisChiffres}
						/>
						<Hoshi
							label={"Le mois d'expiration"}
							rkType="textInputLogin"
							onChangeText={(moisCarte) => {
								this.setState({ moisCarte });
							}}
							borderColor={Check.checkMonth(this.state.moisCarte) ? 'grey' : '#ff4444'}
							value={this.state.moisCarte}
						/>
						<Hoshi
							label={"L'année d'expiration"}
							rkType="textInputLogin"
							onChangeText={(anneeCarte) => {
								this.setState({ anneeCarte });
							}}
							borderColor={Check.checkAnneeCarte(this.state.anneeCarte) ? 'grey' : '#ff4444'}
							value={this.state.anneeCarte}
						/>
						{this.renderButtonInscrire()}
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
		paddingTop: StatusBarPadding,
		padding: 10,
		flex: 1,
		backgroundColor: 'black',
	},
	title: {
		color: 'white',
		backgroundColor: 'black',
		padding: 10,
		fontWeight: 'bold',
		fontFamily: 'monospace',
	},
	footer: {
		justifyContent: 'flex-end',
		flex: 1,
	},
	buttonSignIn: {
		backgroundColor: 'white',
		marginLeft: 50,
		marginTop: 20,
		width: 250,
	},
	save: {
		marginVertical: 9,
	},
	textRow: {
		justifyContent: 'center',
		flexDirection: 'row',
	},
	rubanHaut: {
		backgroundColor: '#cc0000',
		paddingBottom: 10,
		paddingTop: 10,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
		borderColor: 'black',
		borderBottomWidth: 1,
		borderTopWidth: 1,
	},
	container: {
		flex: 1,
	},
};

export default Inscription;
