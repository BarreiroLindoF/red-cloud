import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Linking, Share, FlatList } from 'react-native';
import { RkButton, RkTheme, RkText } from 'react-native-ui-kitten';
import Modal from 'react-native-modalbox';
import { Hoshi } from 'react-native-textinput-effects';

import { api, URL } from './../../rest/api';

const Dimensions = require('Dimensions');

const proportionImageScrollView = 1.7;
const FaceBookImgSrc = require('../../assets/images/facebook-logo.png');
const YoutubeImgSrc = require('../../assets/images/youtube-logo.png');
const TwitchImgSrc = require('../../assets/images/twitch-logo.png');
const TwitterImgSrc = require('../../assets/images/twitter-logo.png');
const PartageImgSrc = require('../../assets/images/share-logo.png');

const FaceBookPage = 'https://www.facebook.com/WEIRDnet/';
const TwitterPage = 'https://twitter.com/The_eBar';
const TwitchPage = 'https://www.twitch.tv/smokeyz76';
const YoutubePage = 'https://www.youtube.com/channel/UCRijo3ddMTht_IHyNSNXpNQ';

const Android = require('react-native').Platform.OS === 'android';

const StoreAppUrl = 'https://play.google.com/store/apps/details?id=com.bigredcloud.app'; //A changer une fois en prod

const styleFile = require('./styles');

class PresentationEventTournoi extends React.Component {
	//eslint-disable-next-line
	static navigationOptions = {
		title: 'Tournoi au RedCloud',
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
		};
		const params = this.getNavigationParams();
		if (params.eventDisplay !== undefined && params.eventDisplay !== false) {
			this.loadTournaments();
		}
		this.renderItem = this.renderItem.bind(this);
	}

	getNavigationParams() {
		return this.props.navigation.state.params || {};
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

	checkTeamName(nomEquipe, idTournoi) {
		if (this.state.nomEquipe === '') {
			this.setState({ errorMessage: "Veuillez entrer un nom d'équipe" }, this.toggleModal());
			return;
		}
		const url = URL.teamCheck.replace('{$id}', idTournoi);
		api()
			.post(url, {
				nom_equipe: nomEquipe,
			})
			.then((response) => {
				if (response.data.success) {
					this.props.navigation.navigate('Inscription', {
						nomEquipe,
						idTournoi,
					});
				} else {
					this.setState({ errorMessage: response.data.message }, this.toggleModal());
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	keyExtractor(post) {
		return post.id_tournoi;
	}

	toggleModal() {
		this.setState({ modalVisible: !this.state.modalVisible });
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

	renderInscription(tournoi) {
		if (tournoi.participants_max - tournoi.participants > 0) {
			return (
				<View>
					<Text>Prix par inscription: {tournoi.prix_inscription}.- CHF</Text>
					<Text>Nombre d'inscriptions limite : {tournoi.participants_max}</Text>
					<Text>Nombre de places disponibles : {tournoi.participants_max - tournoi.participants}</Text>
					<Text>Vous avez encore jusqu'au ... pour vous inscrire.</Text>
					<Hoshi
						label={'Le nom de ton équipe'}
						rkType="textInputLogin"
						onChangeText={(nomEquipe) => {
							this.setState({ nomEquipe });
						}}
						borderColor={this.state.nomEquipe !== '' ? 'grey' : '#ff4444'}
						value={this.state.nomEquipe}
					/>
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
				</View>
			);
		}
		return (
			<View>
				<Text>Les inscriptions sont fermées!</Text>
			</View>
		);
	}

	render() {
		const itemToDisplay = this.props.navigation.state.params.item;
		const eventDisplay = this.props.navigation.state.params.eventDisplay;
		return (
			<View style={Styles.container}>
				{this.renderModal()}
				<View style={Styles.rubanHaut}>
					<Text style={Styles.title}>{itemToDisplay.titre}</Text>
				</View>
				<View style={Styles.containerScrollView}>
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
								<View style={Styles.bottomLineContainer}>
									<Text style={Styles.bottomLine} />
								</View>
								{this.renderInscription(itemToDisplay)}
							</View>
						)}
					</ScrollView>
				</View>

				<View style={Styles.bottomLineContainer}>
					<Text style={Styles.bottomLine} />
				</View>
				<View style={Styles.socialFooter}>
					<TouchableOpacity
						onPress={() => {
							Linking.openURL(FaceBookPage);
						}}
					>
						<Image source={FaceBookImgSrc} style={Styles.logo} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							Share.share({
								message: `RedCloud est désromais dans ton Store ! N'attends plus et viens rejoindre tes amis et rivaux :)!
                                    ${Android ? StoreAppUrl : ''}`,
								url: undefined,
								title: 'App RedCloud',
							});
						}}
					>
						<Image source={PartageImgSrc} style={Styles.logo} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							Linking.openURL(TwitterPage);
						}}
					>
						<Image source={TwitterImgSrc} style={Styles.logo} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							Linking.openURL(TwitchPage);
						}}
					>
						<Image source={TwitchImgSrc} style={Styles.logo} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							Linking.openURL(YoutubePage);
						}}
					>
						<Image source={YoutubeImgSrc} style={Styles.logo} />
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

let Styles = {
	logo: {
		width: 50,
		height: 50,
		resizeMode: 'stretch',
	},
	buttonSend: {
		backgroundColor: 'red',
		justifyContent: 'center',
		width: 200,
	},
	container: {
		flex: 1,
		backgroundColor: 'white',
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
	title: {
		color: 'white',
		backgroundColor: 'black',
		padding: 10,
		fontWeight: 'bold',
		fontFamily: 'monospace',
	},
	containerScrollView: {
		backgroundColor: 'white',
		flex: 1,
		marginBottom: 10,
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
	},
	bottomLine: {
		width: 250,
		paddingBottom: 10,
		marginTop: 10,
		borderTopColor: '#cc0000',
		borderTopWidth: 2,
	},
	socialFooter: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 25,
		paddingLeft: 35,
		paddingRight: 35,
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