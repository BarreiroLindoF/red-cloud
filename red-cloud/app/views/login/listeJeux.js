import React from 'react';
import { SearchBar, Button } from 'react-native-elements';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
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
import { updateConditions, userLogin, updateIdsJeux } from './../../redux/actions';
import { api, URL } from '../../rest/api';
import LogoHeader from './../../components/avatar/logoHeader';
import { registerForPushNotificationsAsync } from './../../notifications/notifications';

import stylesBlack from '../../styles/StyleSheetB';

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
	jeux: state.jeux,
});

const mapDispatchToProps = (dispatch) => ({
	changerConditions: (conditions) => {
		dispatch(updateConditions(conditions));
	},
	userLogin: (token) => {
		dispatch(userLogin(token));
	},
	updateIdsJeux: (id) => {
		dispatch(updateIdsJeux(id));
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
			categories: [],
			checkedByUser: [],
			checkBoxes: [],
			checkBoxesFiltered: [],
			searchingTermTest: '',
			modalVisible: false,
			modalMessage: '',
			isFetching: false,
			isFetchingJeux: true,
			userCreated: false,
			selectedItems: [],
			isSigningUp: this.props.navigation.state.params.isSigningUp,
		};
		api()
			.get(URL.jeux)
			.then((response) => {
				this.setState({
					checkBoxes: response.data.payload,
					checkBoxesFiltered: response.data.payload,
					isFetchingJeux: false,
				});
			})
			.catch((error) => {
				console.log(error);
			});
		api()
			.get(URL.categoriesJeux)
			.then((response) => {
				this.setState({
					categories: response.data.payload,
					isFetchingJeux: false,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	onClick(idJeu) {
		this.props.updateIdsJeux(idJeu);
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
				jeux: this.props.jeux,
			})
			.then((reponse) => {
				if (reponse.data.success) {
					registerForPushNotificationsAsync().then((token) => {
						api()
							.post(URL.login, {
								pseudo: this.props.pseudo,
								password: this.props.password,
								notificationToken: token,
							})
							.then((response) => {
								this.setState({ isFetching: false });
								if (response.data.success) {
									this.props.userLogin(response.data.payload);
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
					});
				}
			})
			.catch((error) => {
				this.setState({ isFetching: false });
				console.log(error);
			});
	}

	updateJeuxFavoris() {
		api()
			.put(URL.updateJeux, {
				jeux: this.props.jeux,
			})
			.then(() => {
				this.props.navigation.dispatch(NavigationActions.back());
			})
			.catch(() => {
				this.setState({
					modalMessage: 'Problème lors de la sauvegarde...',
					modalVisible: true,
					userCreated: false,
				});
			});
	}

	openEvents() {
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'Tabs' })],
		});
		this.props.navigation.dispatch(resetAction);
	}

	async resetSearch() {
		await this.setState({ checkBoxesFiltered: this.state.checkBoxes });
		this.makeFilterSearch(this.state.selectedItems);
	}

	async makeSearch(searchingTerm) {
		if (searchingTerm === '') {
			//Obliger de faire ce test pour quand l'utilisateur efface le text de recherche sans cliquer sur la croix
			this.setState({ searchingTermTest: searchingTerm });
			await this.resetSearch();
		}
		let filteredGames = [];
		if (this.state.checkBoxesFiltered.length > 0) {
			filteredGames = this.state.checkBoxesFiltered.filter((Game) => {
				return Game.nom.toLowerCase().indexOf(searchingTerm.toLowerCase()) !== -1;
			});
		} else {
			filteredGames = this.state.checkBoxes.filter((Game) => {
				return Game.nom.toLowerCase().indexOf(searchingTerm.toLowerCase()) !== -1;
			});
		}
		this.setState({ checkBoxesFiltered: filteredGames, searchingTermTest: searchingTerm });
	}

	renderModal() {
		return (
			<Modal
				style={stylesBlack.modalStyle}
				position={'center'}
				isOpen={this.state.modalVisible}
				backdropOpacity={0.8}
				swipeToClose={false}
				backdropPressToClose={false}
			>
				<RkButton rkType="clear">{this.state.modalMessage}</RkButton>
				<TouchableOpacity
					style={stylesBlack.modalButton}
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
		if (this.state.isFetchingJeux) {
			return <ActivityIndicator size="large" color="white" style={{ paddingTop: 15 }} />;
		}
		return this.state.checkBoxesFiltered.length === 0 ? (
			<Text style={stylesBlack.mainText}> Aucun jeux ne correspond à votre recherche...</Text>
		) : (
			this.state.checkBoxesFiltered.map((checkbox, index) => (
				<CheckBox
					key={this.state.checkBoxesFiltered[index].id_jeu}
					isChecked={this.props.jeux.includes(this.state.checkBoxesFiltered[index].id_jeu)}
					style={{ flex: 1, padding: 10 }}
					leftText={this.state.checkBoxesFiltered[index].nom}
					leftTextStyle={{ color: 'white' }}
					onClick={() => this.onClick(this.state.checkBoxesFiltered[index].id_jeu)}
					checkBoxColor="white"
				/>
			))
		);
	}

	renderSuivant() {
		if (this.state.isFetching) {
			return (
				<View style={stylesBlack.posLoadingButton}>
					<ActivityIndicator size="large" color="#cc0000" style={{ paddingTop: 15 }} />
				</View>
			);
		}
		let buttonText;
		if (this.state.isSigningUp) {
			buttonText = 'Suivant';
		} else {
			buttonText = 'Sauvegarder';
		}
		return (
			<View style={stylesBlack.posLoadingButton}>
				<RkButton
					style={stylesBlack.btnStyle}
					rkType="social"
					onPress={() => {
						if (this.state.isSigningUp) {
							this.createUser();
						} else {
							this.updateJeuxFavoris();
						}
					}}
				>
					<RkText style={stylesBlack.btnFont}>{buttonText}</RkText>
				</RkButton>
			</View>
		);
	}

	onSelectedItemsChange = (selectedItems) => {
		this.setState({ selectedItems });
		this.makeFilterSearch(selectedItems);
	};

	async makeFilterSearch(filtersTerms) {
		const filteredGames = [];
		for (let i = 0; i < filtersTerms.length; i++) {
			filteredGames.push(
				this.state.checkBoxes.filter((Game) => {
					return Game.designation.toLowerCase().indexOf(filtersTerms[i].toLowerCase()) !== -1;
				}),
			);
		}
		if (filtersTerms.length > 0) {
			const flattenedFilteredGames = [].concat(...filteredGames); //FilteredGames est devenu un tableau qui contient un tableau par catégorie de filtre appliqué, fonc je le transforme en un tableau d'objets (flatten)
			await this.setState({ checkBoxesFiltered: flattenedFilteredGames });
		} else {
			await this.setState({ checkBoxesFiltered: this.state.checkBoxes });
		}
		if (this.state.searchingTermTest !== '') {
			this.makeSearch(this.state.searchingTermTest);
		}
	}

	renderConditions() {
		if (!this.state.isSigningUp) return;
		return (
			<View style={{ flexDirection: 'row', paddingLeft: 25, paddingBottom: 40, paddingRight: 10 }}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={stylesBlack.mainText}>Accepter les </Text>
					<Text
						onPress={() => {
							this.props.navigation.navigate('Conditions');
						}}
						style={stylesBlack.linkText}
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
		);
	}

	render() {
		return (
			<View style={stylesBlack.mainContentContainer}>
				<KeyboardAvoidingView style={{ minHeight: 450 }} behavior="padding" keyboardVerticalOffset={55}>
					<SearchBar
						containerStyle={{ backgroundColor: 'black' }}
						round
						clearIcon
						onChangeText={(input) => {
							this.makeSearch(input);
						}}
						onClearText={() => {
							this.resetSearch();
						}}
						placeholder="Rechercher..."
					/>
					<View style={{ justifyContent: 'center', paddingTop: 10, marginLeft: 8, marginRight: 5 }}>
						<SectionedMultiSelect
							items={this.state.categories}
							uniqueKey="designation"
							displayKey="designation"
							selectText="Choisir un filtre..."
							selectedText="filtres choisis"
							confirmText="Valider"
							showDropDowns
							colors={{
								primary: 'black',
								sucess: 'red',
								text: 'black',
								chipColor: 'red',
								selectToggleTextColor: 'white',
							}}
							modalAnimationType="slide"
							hideSearch
							onSelectedItemsChange={this.onSelectedItemsChange}
							selectedItems={this.state.selectedItems}
						/>
					</View>
					<RkText style={stylesBlack.mainText} rkType="primary3">
						Sélectionnez vos jeux favoris :
					</RkText>
					<View style={stylesBlack.mainContentContainer}>
						<ScrollView>{this.renderCheckboxes()}</ScrollView>
					</View>
				</KeyboardAvoidingView>
				{this.renderConditions()}
				{this.renderModal()}
				{this.renderSuivant()}
			</View>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListeJeux);
