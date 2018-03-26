import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Linking, Share } from 'react-native';
import { RkButton, RkText } from 'react-native-ui-kitten';
import stylesWhite from './../../styles/StyleSheetW';
import LogoHeader from './../../components/avatar/logoHeader';

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
		headerTitle: <LogoHeader />,
		color: 'white',
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
			<View style={stylesWhite.mainContentContainer}>
				<View style={stylesWhite.redStrip}>
					<Text style={stylesWhite.title}>{tournoi.titre}</Text>
				</View>
				<View style={stylesWhite.scrollViewContainer}>
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
							<Text multiline style={stylesWhite.mainText}>
								{this.state.reglement}
							</Text>
						</View>
						<View style={stylesWhite.btnPosition}>
							<RkButton rkType="social" style={stylesWhite.btnStyle}>
								<RkText rkType="awesome hero accentColor" style={stylesWhite.btnFont}>
									Je m'inscris !
								</RkText>
							</RkButton>
							<View style={stylesWhite.redLineBottom} />
						</View>
						<View style={stylesWhite.socialFooter}>
							<TouchableOpacity
								onPress={() => {
									Linking.openURL(FaceBookPage);
								}}
							>
								<Image source={FaceBookImgSrc} style={stylesWhite.logoSocialMedias} />
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
								<Image source={PartageImgSrc} style={stylesWhite.logoSocialMedias} />
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {
									Linking.openURL(TwitterPage);
								}}
							>
								<Image source={TwitterImgSrc} style={stylesWhite.logoSocialMedias} />
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {
									Linking.openURL(TwitchPage);
								}}
							>
								<Image source={TwitchImgSrc} style={stylesWhite.logoSocialMedias} />
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {
									Linking.openURL(YoutubePage);
								}}
							>
								<Image source={YoutubeImgSrc} style={stylesWhite.logoSocialMedias} />
							</TouchableOpacity>
						</View>
					</ScrollView>
				</View>
			</View>
		);
	}
}

export default PresentationTournoi;
