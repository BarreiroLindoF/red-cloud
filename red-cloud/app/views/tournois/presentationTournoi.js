import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Linking, Share } from 'react-native';
import { RkButton, RkText } from 'react-native-ui-kitten';

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

class PresentationTournoi extends React.Component {
	//eslint-disable-next-line
	static navigationOptions = {
		title: 'Tournoi au RedCloud',
	};

	constructor(props) {
		super(props);
		this.state = {
			reglement:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n\n Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. \n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. \n\n',
			heightScrollViewDisplayed: 420,
		};
	}

	render() {
		const tournoi = this.props.navigation.state.params.tournoi;
		return (
			<View style={Styles.container}>
				<View style={Styles.rubanHaut}>
					<Text style={Styles.title}>{tournoi.titre}</Text>
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
								source={{ uri: tournoi.imageUri }}
								style={{
									width: Dimensions.get('window').width,
									height: this.state.heightScrollViewDisplayed / proportionImageScrollView,
									resizeMode: 'stretch',
								}}
							/>
						</View>
						<View>
							<Text multiline style={Styles.text}>
								{this.state.reglement}
							</Text>
						</View>
						<View style={Styles.btnContainer}>
							<RkButton rkType="social" style={Styles.btn}>
								<RkText rkType="awesome hero accentColor" style={Styles.fontBtn}>
									Je m'inscris !
								</RkText>
							</RkButton>
						</View>
					</ScrollView>
				</View>
				<View style={Styles.bottomLineContainer}>
					<Text style={Styles.bottomLine} />
				</View>
				<View style={Styles.socialFooter}>
					<TouchableOpacity
						onPress={() => {
							/*Linking.openURL(FaceBookPage);*/
							Share.share({
								message: `RedCloud est désromais dans ton Store ! N'attends plus et viens rejoindre tes amis et rivaux :)!
                                    ${Android ? ' ' : ' '}`,
								title: 'App RedCloud',
								image: tournoi.imageUri,
							});
						}}
					>
						<Image source={FaceBookImgSrc} style={Styles.logo} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							Share.share({
								message: `RedCloud est désromais dans ton Store ! N'attends plus et viens rejoindre tes amis et rivaux :)!
                                    ${Android ? tournoi.imageUri : ''}`,
								url: StoreAppUrl,
								title: 'App RedCloud',
								image: tournoi.imageUri,
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
	btnContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	btn: {
		backgroundColor: 'black',
	},
	fontBtn: {
		color: 'white',
		fontWeight: 'bold',
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

export default PresentationTournoi;
