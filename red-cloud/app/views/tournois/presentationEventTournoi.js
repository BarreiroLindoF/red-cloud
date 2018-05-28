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

const Dimensions = require('Dimensions');

const proportionImageScrollView = 1.7;
const FaceBookImgSrc = require('../../assets/images/facebook-logo.png');
const YoutubeImgSrc = require('../../assets/images/youtube-logo.png');
const TwitchImgSrc = require('../../assets/images/twitch-logo.png');
const TwitterImgSrc = require('../../assets/images/twitter-logo.png');
const PartageImgSrc = require('../../assets/images/share-logo.png');
const PDFImgSrc = require('../../assets/images/pdf.png');

const FaceBookPage = 'https://www.facebook.com/WEIRDnet/';
const TwitterPage = 'https://twitter.com/The_eBar';
const TwitchPage = 'https://www.twitch.tv/smokeyz76';
const YoutubePage = 'https://www.youtube.com/channel/UCRijo3ddMTht_IHyNSNXpNQ';

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
			modalVisible: false,
			modalEquipesVisible: false,
			equipes: [],
			isFetchingTeamName: false,
		};
		const params = this.getNavigationParams();
		if (params.eventDisplay !== undefined && params.eventDisplay !== false) {
			this.loadTournaments();
		}
		this.renderItem = this.renderItem.bind(this);
		this.renderLstEquipe = this.renderLstEquipe.bind(this);
	}

	getNavigationParams() {
		return this.props.navigation.state.params || {};
	}

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

	FlatListItemSeparator() {
		return (
			<View style={Styles.separatorContainer}>
				<View style={Styles.separator} />
			</View>
		);
	}

	checkTeamName(nomEquipe, idTournoi) {
		if (this.state.nomEquipe === '') {
			this.setState({ errorMessage: "Veuillez entrer un nom d'équipe" }, this.toggleModal());
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
			.catch(() => {
				this.setState({
					isFetchingTeamName: false,
					errorMessage: "Problèmes de connexion au serveur lors de l'inscription !",
					modalVisible: true,
				});
			});
	}

	keyExtractor(post) {
		return post.id_tournoi;
	}

	keyExtractorEquipe(equipe) {
		return equipe.user_id_user;
	}

	toggleModal() {
		this.setState({ modalVisible: !this.state.modalVisible });
	}

	toggleModalEquipes() {
		this.setState({ modalEquipesVisible: !this.state.modalEquipesVisible });
	}

	lstInscrits(tournoi) {
		return (
			<View>
				<Text>
					Nombre de places disponibles : {tournoi.participants_max - tournoi.participants}
					{tournoi.participants > 0 && (
						<Text>
							<Text> Liste des inscrits </Text>
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
							this.props.navigation.navigate('PresentationEventTournoi', {
								item: tournoi.item,
								eventDisplay: false,
								date: this.props.navigation.state.params.date,
							});
						}}
					>
						<RkText style={Styles.fontBtn}> En savoir plus </RkText>
					</RkButton>
				</View>
			</View>
		);
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
					}}
				>
					<View>
						<Text style={{ color: 'black' }}>Retour</Text>
					</View>
				</TouchableOpacity>
			</Modal>
		);
	}

	renderButtonInscription(tournoi) {
		if (this.state.isFetchingTeamName) {
			return <ActivityIndicator size="large" color="#cc0000" style={{ paddingTop: 15 }} />;
		}
		return (
			<View style={Styles.btnSubscribeContainer}>
				<RkButton
					rkType="dark"
					onPress={() => {
						this.checkTeamName(this.state.nomEquipe, tournoi.id_tournoi);
					}}
				>
					<RkText style={Styles.fontBtn}> Inscris toi ! </RkText>
				</RkButton>
			</View>
		);
	}

	renderInscription(tournoi, date) {
		if (tournoi.inscrit) {
			return (
				<View>
					<Text>Vous êtes déjà inscrit !</Text>
				</View>
			);
		} else if (tournoi.participants_max - tournoi.participants > 0) {
			return (
				<View>
					<Text>Prix par inscription: {tournoi.prix_inscription}.- CHF</Text>
					<Text>Nombre d'inscriptions limite : {tournoi.participants_max}</Text>
					{this.lstInscrits(tournoi)}
					<Text>Vous avez encore jusqu'au {date} pour vous inscrire.</Text>
					<Text>Le tournoi commencera à {tournoi.heureDebut}. Ne soyez pas en retard !</Text>

					<Hoshi
						label={'Le nom de ton équipe'}
						rkType="textInputLogin"
						onChangeText={(nomEquipe) => {
							this.setState({ nomEquipe });
						}}
						borderColor={this.state.nomEquipe !== '' ? 'grey' : '#ff4444'}
						value={this.state.nomEquipe}
					/>
					{this.renderButtonInscription(tournoi)}
				</View>
			);
		}
		return (
			<View>
				<Text>Les inscriptions sont fermées!</Text>
			</View>
		);
	}

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
					{this.renderModal()}
					{this.renderLstEquipe()}
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
