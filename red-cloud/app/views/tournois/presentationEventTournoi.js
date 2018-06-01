import React from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image,
	Linking,
	Share,
	FlatList,
	ActivityIndicator,
	KeyboardAvoidingView,
} from 'react-native';
import { RkButton, RkTheme, RkText } from 'react-native-ui-kitten';
import Modal from 'react-native-modalbox';
import { Hoshi } from 'react-native-textinput-effects';

import { api, URL } from './../../rest/api';

import stylesWhite from './../../styles/StyleSheetW';
import LogoHeader from './../../components/avatar/logoHeader';
import stylesBlack from './../../styles/StyleSheetB';

const Dimensions = require('Dimensions');

const proportionImageScrollView = 1.7;
const FaceBookImgSrc = require('../../assets/images/facebook-logo.png');
const YoutubeImgSrc = require('../../assets/images/youtube-logo.png');
const TwitchImgSrc = require('../../assets/images/twitch-logo.png');
const TwitterImgSrc = require('../../assets/images/twitter-logo.png');
const PartageImgSrc = require('../../assets/images/share-logo.png');
const PDFImgSrc = require('../../assets/images/pdf.png');

const Android = require('react-native').Platform.OS === 'android';

const StoreAppUrl = Android ? 'https://play.google.com/store/apps/details?id=com.bigredcloud.app' : ''; //A changer une fois en prod

const styleFile = require('./styles');

class PresentationEventTournoi extends React.Component {
	//eslint-disable-next-line
	static navigationOptions = {
		headerTitle: <LogoHeader />,
		color: 'white',
	};

	constructor(props) {
		super(props);
		this.state = {
			tournois: [],
			tournoi: {},
			heightScrollViewDisplayed: 420,
			isFetching: true,
			nomEquipe: '',
			errorMessage: '',
			modalEquipesVisible: false,
			modalTeamName: false,
			equipes: [],
			isFetchingTeamName: false,
		};
		const params = this.getNavigationParams();
		if (params.eventDisplay !== undefined && params.eventDisplay !== false) {
			this.loadTournaments();
		}
		this.renderItem = this.renderItem.bind(this);
		this.renderLstEquipe = this.renderLstEquipe.bind(this);
		this.touchablePressed = false;
	}

	getNavigationParams() {
		return this.props.navigation.state.params || {};
	}

	//Récupère la liste des équipes déjà inscrite à un tournoi
	getLstEquipes(idTournoi) {
		const url = URL.participants.replace('{$id}', idTournoi);
		api()
			.get(url)
			.then((response) => {
				this.setState({
					equipes: response.data.payload,
				});
				console.log(this.state.equipes);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	//Charge la liste des tournois propre à un évènement
	loadTournaments() {
		const url = URL.tournaments.replace('{$id}', this.props.navigation.state.params.item.id_event);
		api()
			.get(url)
			.then((response) => {
				this.setState({
					tournois: response.data.payload,
					isFetching: false,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	//Séparateur visuel
	FlatListItemSeparator() {
		return (
			<View style={Styles.separatorContainer}>
				<View style={Styles.separator} />
			</View>
		);
	}

	//Vérification du nom d'équipe entré par l'utilisateur. Si vide, affichage d'un message. Si le nom existe déjà, affichage d'un message
	checkTeamName(nomEquipe, idTournoi) {
		if (this.state.nomEquipe === '') {
			this.setState({ errorMessage: "Veuillez entrer un nom d'équipe" });
			return;
		}
		const url = URL.teamCheck.replace('{$id}', idTournoi);
		this.setState({ isFetchingTeamName: true });
		api()
			.post(url, {
				nom_equipe: nomEquipe,
			})
			.then((response) => {
				this.setState({ isFetchingTeamName: false });
				if (response.data.success) {
					this.props.navigation.navigate('Inscription', {
						nomEquipe,
						idTournoi,
					});
				} else {
					this.setState(
						{
							isFetchingTeamName: false,
							errorMessage: response.data.message,
						},
						this.toggleModal(),
					);
				}
			})
			.catch((error) => {
				console.log(error);
				this.setState({
					isFetchingTeamName: false,
					errorMessage: "Problèmes de connexion au serveur lors de l'inscription !",
				});
			});
	}

	//Extraction de la clé unique d'un tournoi
	keyExtractor(post) {
		return post.id_tournoi;
	}

	//Extraction de la clé unique d'un tournoi
	keyExtractorEquipe(equipe) {
		return equipe.user_id_user;
	}

	//Change la visibilité du modal à visible ou non visible
	toggleModal() {
		this.setState({ modalVisible: !this.state.modalVisible });
	}

	//Change la visibilité du modal de la liste des équipe à visible ou non visible
	toggleModalEquipes() {
		this.setState({ modalEquipesVisible: !this.state.modalEquipesVisible });
	}

	//Rendu du nombre d'inscrits et de l'accès à la liste des équipes inscrites
	lstInscrits(tournoi) {
		return (
			<View>
				<Text>
					Nombre de places disponibles : {tournoi.participants_max - tournoi.participants}
					{tournoi.participants > 0 && (
						<Text>
							<Text> (Liste des inscrits </Text>
							<Text
								style={{ color: '#cc0000' }}
								onPress={() => {
									this.getLstEquipes(tournoi.id_tournoi);
									this.toggleModalEquipes();
								}}
							>
								ici
							</Text>
							<Text>)</Text>
						</Text>
					)}
				</Text>
			</View>
		);
	}

	//Rendu d'un tournoi dans la liste de tournoi de l'évènement. Titre avec son bouton permettant d'y accéder.
	renderItem(tournoi) {
		return (
			<View style={Styles.tournamentsContainer}>
				<View style={Styles.txtTounamentContainer}>
					<RkText>{tournoi.item.titre}</RkText>
				</View>
				<View style={Styles.btnTournamentsContainer}>
					<RkButton
						rkType="dark"
						onPress={() => {
							if (this.touchablePressed) return;
							this.props.navigation.navigate('PresentationEventTournoi', {
								item: tournoi.item,
								eventDisplay: false,
								date: this.props.navigation.state.params.date,
							});
							this.touchablePressed = true;
							setTimeout(() => {
								this.touchablePressed = false;
							}, 1000);
						}}
					>
						<RkText style={Styles.fontBtn}> En savoir plus </RkText>
					</RkButton>
				</View>
			</View>
		);
	}

	//Rendu du modal pour inscrire le nom de l'équipe
	renderTeamModal(tournoi) {
		return (
			<Modal
				style={stylesBlack.modalStyle}
				position={'center'}
				isOpen={this.state.modalTeamName}
				backdropOpacity={0.8}
				swipeToClose={false}
				backdropPressToClose={false}
			>
				<KeyboardAvoidingView
					style={{ justifyContent: 'center', height: '100%', width: '80%' }}
					behavior="padding"
					keyboardVerticalOffset={-50}
				>
					<Hoshi
						label={'Le nom de ton équipe'}
						rkType="textInputLogin"
						onChangeText={(nomEquipe) => {
							this.setState({ nomEquipe });
						}}
						borderColor={this.state.nomEquipe !== '' ? 'grey' : '#ff4444'}
						value={this.state.nomEquipe}
					/>
					<Text style={{ color: 'red', margin: 10 }}>
						{this.state.nomEquipe === '' ? this.state.errorMessage : ''}
					</Text>
					<View style={stylesBlack.btnPosition}>
						<RkButton
							rkType="social"
							onPress={() => {
								this.setState({ modalTeamName: false, errorMessage: '' });
							}}
							style={[stylesBlack.btnStyle, { marginRight: 25 }]}
						>
							<RkText rkType="awesome hero accentColor" style={stylesBlack.btnFont}>
								Annuler
							</RkText>
						</RkButton>

						{this.state.isFetchingTeamName && <ActivityIndicator size="large" color="#cc0000" />}
						{!this.state.isFetchingTeamName && (
							<RkButton
								rkType="social"
								onPress={() => {
									this.checkTeamName(this.state.nomEquipe, tournoi.id_tournoi);
								}}
								style={[stylesBlack.btnStyle, { marginRight: 25 }]}
							>
								<RkText rkType="awesome hero accentColor" style={stylesBlack.btnFont}>
									Confirmer
								</RkText>
							</RkButton>
						)}
					</View>
				</KeyboardAvoidingView>
			</Modal>
		);
	}

	//Rendu du bouton d'inscription qui permet de renseigner le nom de son équipe, si l'utilisateur n'est pas déjà inscris au tournoi
	renderButtonInscription(tournoi) {
		if (tournoi.inscrit) {
			return (
				<View style={{ paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
					<Text>Vous êtes déjà inscrit !</Text>
				</View>
			);
		} else if (tournoi.participants_max - tournoi.participants <= 0) {
			return (
				<View>
					<Text>Les inscriptions sont fermées!</Text>
				</View>
			);
		}
		return (
			<View style={Styles.btnSubscribeContainer}>
				<RkButton
					rkType="dark"
					onPress={() => {
						this.setState({ modalTeamName: true });
					}}
				>
					<RkText style={Styles.fontBtn}> Inscris-toi ! </RkText>
				</RkButton>
			</View>
		);
	}

	//Rendu des informations concernant l'inscription à ce tournoi
	renderInscription(tournoi, date) {
		return (
			<View>
				<Text>Prix par inscription: {tournoi.prix_inscription}.- CHF</Text>
				<Text>Nombre d'inscriptions limite : {tournoi.participants_max}</Text>
				{this.lstInscrits(tournoi)}
				<Text>Vous avez encore jusqu'au {date} pour vous inscrire.</Text>
				<Text>Le tournoi commencera à {tournoi.heureDebut}. Ne soyez pas en retard !</Text>
				{this.renderButtonInscription(tournoi)}
			</View>
		);
	}

	//Rendu du modal de la liste des équipes inscrites au tournoi
	renderLstEquipe() {
		return (
			<Modal
				style={{
					backgroundColor: 'transparent',
					alignItems: 'center',
					height: 250,
					width: 250,
				}}
				backdropOpacity={0.6}
				position={'center'}
				isOpen={this.state.modalEquipesVisible}
				swipeToClose={false}
			>
				<ScrollView style={Styles.flatListContainer} scrollEnabled>
					<FlatList
						style={Styles.flatList}
						data={this.state.equipes}
						keyExtractor={this.keyExtractorEquipe}
						ItemSeparatorComponent={this.FlatListItemSeparator}
						renderItem={({ item }) => <Text style={Styles.item}> {item.nom_equipe} </Text>}
					/>
				</ScrollView>
				<TouchableOpacity
					style={[styleFile.buttonConditions, { marginTop: 20, borderRadius: 5 }]}
					onPress={() => {
						this.toggleModalEquipes();
					}}
				>
					<View>
						<Text style={{ color: 'black' }}>Retour</Text>
					</View>
				</TouchableOpacity>
			</Modal>
		);
	}

	//Rendu global du composant
	render() {
		const itemToDisplay = this.props.navigation.state.params.item;
		const eventDisplay = this.props.navigation.state.params.eventDisplay;
		return (
			<KeyboardAvoidingView
				style={stylesWhite.mainContentContainer}
				behavior="padding"
				keyboardVerticalOffset={55}
			>
				<View style={stylesWhite.scrollViewContainer}>
					<View style={stylesWhite.redStrip}>
						<Text style={stylesWhite.title}>{itemToDisplay.titre}</Text>
					</View>
					<ScrollView
						contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
						onLayout={(event) => {
							this.setState({ heightScrollViewDisplayed: event.nativeEvent.layout.height });
						}}
					>
						<View>
							<Image
								source={{
									uri: itemToDisplay.imageUri,
								}}
								style={{
									width: Dimensions.get('window').width,
									height: this.state.heightScrollViewDisplayed / proportionImageScrollView,
									resizeMode: 'stretch',
								}}
							/>
						</View>
						<View>
							<Text multiline style={Styles.text}>
								{itemToDisplay.description}
							</Text>
						</View>
						{eventDisplay && (
							<View>
								<Text style={{ textDecorationLine: 'underline', fontSize: 16 }}>
									{'\n\n'}Liste des tounois de l'évènement
								</Text>
								<FlatList
									data={this.state.tournois}
									renderItem={this.renderItem}
									keyExtractor={this.keyExtractor}
									refreshing={this.state.isFetching}
									onRefresh={() => {
										this.loadTournaments();
									}}
								/>
							</View>
						)}
						{!eventDisplay && (
							<View>
								<View style={Styles.btnSubscribeContainer}>
									<RkText> Voir le règlement : </RkText>
									<TouchableOpacity
										onPress={() => {
											Linking.openURL(itemToDisplay.reglementUri);
										}}
									>
										<Image source={PDFImgSrc} style={stylesWhite.logoSocialMedias} />
									</TouchableOpacity>
								</View>
								<View style={Styles.bottomLineContainer}>
									<Text style={Styles.bottomLine} />
								</View>
								{this.renderInscription(itemToDisplay, this.props.navigation.state.params.date)}
							</View>
						)}
					</ScrollView>
				</View>

				<View style={stylesWhite.centerContent}>
					<View style={stylesWhite.redLineBottomSocialMedia} />
				</View>

				<View style={stylesWhite.socialFooter}>
					<TouchableOpacity
						onPress={() => {
							Linking.openURL(itemToDisplay.page_facebook_url);
						}}
					>
						<Image source={FaceBookImgSrc} style={stylesWhite.logoSocialMedias} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							Share.share({
								message: itemToDisplay.msg_partage + StoreAppUrl,
								url: undefined,
								title: 'App RedCloud',
							});
						}}
					>
						<Image source={PartageImgSrc} style={stylesWhite.logoSocialMedias} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							Linking.openURL(itemToDisplay.page_twitter_url);
						}}
					>
						<Image source={TwitterImgSrc} style={stylesWhite.logoSocialMedias} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							Linking.openURL(itemToDisplay.page_twitch_url);
						}}
					>
						<Image source={TwitchImgSrc} style={stylesWhite.logoSocialMedias} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							Linking.openURL(itemToDisplay.page_youtube_url);
						}}
					>
						<Image source={YoutubeImgSrc} style={stylesWhite.logoSocialMedias} />
					</TouchableOpacity>
				</View>
				{this.renderTeamModal(itemToDisplay)}
				{this.renderLstEquipe()}
			</KeyboardAvoidingView>
		);
	}
}

let Styles = {
	buttonSend: {
		backgroundColor: 'red',
		justifyContent: 'center',
		width: 200,
	},
	text: {
		color: 'black',
		textAlign: 'justify',
		lineHeight: 20,
		paddingTop: 10,
	},
	tournamentsContainer: {
		flexDirection: 'row',
		paddingTop: 20,
		paddingLeft: 20,
	},
	txtTounamentContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnTournamentsContainer: {
		alignItems: 'flex-end',
		flex: 1,
		paddingRight: 10,
	},
	btnSubscribeContainer: {
		paddingTop: 20,
		alignItems: 'center',
		flex: 1,
	},
	fontBtn: {
		color: 'white',
		textAlign: 'center',
	},
	bottomLineContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	flatListContainer: {
		width: 250,
		borderRadius: 10,
		backgroundColor: 'white',
		flex: 1,
		paddingBottom: 10,
	},

	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
	flatlist: {
		width: 250,
		paddingTop: 10,
	},
	separatorContainer: {
		height: 1,
		width: '100%',
		alignItems: 'center',
	},
	separator: {
		height: 1,
		backgroundColor: 'grey',
		width: '85%',
	},
};

RkTheme.setType('RkButton', 'dark', {
	container: {
		backgroundColor: 'black',
		height: 35,
		width: 150,
	},
});

export default PresentationEventTournoi;
