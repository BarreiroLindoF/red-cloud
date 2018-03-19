import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Linking, Share, FlatList } from 'react-native';
import { RkButton, RkTheme, RkText } from 'react-native-ui-kitten';
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
		api()
			.get(URL.tournaments, {
				params: {
					id: this.props.navigation.state.params.item.id_event,
				},
			})
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

	keyExtractor(post) {
		return post.id_tournoi;
	}

	renderItem(tournoi) {
		return (
			<View style={Styles.tournamentsContainer}>
				<View style={Styles.txtTounamentContainer}>
					<RkText>{tournoi.item.titre}</RkText>
				</View>
				<View style={Styles.btnTournamentContainer}>
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

	render() {
		const itemToDisplay = this.props.navigation.state.params.item;
		const eventDisplay = this.props.navigation.state.params.eventDisplay;
		return (
			<View style={Styles.container}>
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
									uri: 'http://192.168.153.1:8000/images/events/leagueOfLegends.jpg',
								}} /*itemToDisplay.imageUri*/
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
							<FlatList
								data={this.state.tournois}
								renderItem={this.renderItem}
								keyExtractor={this.keyExtractor}
								refreshing={this.state.isFetching}
								onRefresh={() => {
									this.loadTournaments();
								}}
							/>
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
	btnTournamentContainer: {
		alignItems: 'flex-end',
		flex: 1,
		paddingRight: 10,
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
	},
});

export default PresentationEventTournoi;
