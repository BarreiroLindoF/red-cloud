// React imports
import React from 'react';
import { Text, View, TouchableOpacity, Linking, Platform, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import { RkButton, RkText } from 'react-native-ui-kitten';

// External imports
import { phonecall, email } from 'react-native-communications';
import { Hoshi } from 'react-native-textinput-effects';

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// Configurations imports
import { StatusBarPaddingView } from './../../config/header';

//Styles import
import stylesWhite from './../../styles/StyleSheetW';
import LogoHeader from './../../components/avatar/logoHeader';

// Image imports
const mapImageSource = require('../../assets/icons/map.png');

// Global variables
const PlatformIsIos = Platform.OS === 'ios';

const cellPhoneNumber = '+41763847410';
const cellPhoneNumberFormatted = '+41 76 384 74 10';

const emailRedCloud = 'redcloud@redcloud.com';
const webSiteRedCloud = 'http://redcloud.com';
const adresseRedCloud = 'Route de Drize 17\n1227 Carouge\nGenève';
const latitudeRedCloud = '46.175554';
const longitudeRedCloud = '6.138465';

class Contact extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		tabBarLabel: 'Contact',
		tabBarIcon: () => {
			return <Icon size={24} color="red" name="place" />;
		},
		headerTitle: <LogoHeader />,
		color: 'white',
	};

	constructor(props) {
		super(props);
		this.state = {
			messageHeight: 60,
			message: '',
		};

		this.handleChangeText = this.handleChangeText.bind(this);
	}

	handleChangeText(message) {
		this.setState({ message });
	}

	renderInformations() {
		return (
			<View>
				<Text style={{ fontSize: 18, marginBottom: 10 }}>
					Contactez et retrouvez-nous à l'aide des liens suivants :
				</Text>
				<View style={{ paddingLeft: 15 }}>
					<TouchableOpacity
						onPress={() => {
							phonecall(cellPhoneNumber, true);
						}}
					>
						<View style={[stylesWhite.centerContent, { paddingBottom: 10 }]}>
							<Icon
								size={20}
								color="black"
								name="call"
								style={{ paddingRight: 10, alignItems: 'center' }}
							/>
							<Text style={{ fontSize: 20 }}>{cellPhoneNumberFormatted}</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							// email(to, cc, bcc, subject, body)
							email([emailRedCloud], null, null, null, null);
						}}
					>
						<View style={[stylesWhite.centerContent, { paddingBottom: 10 }]}>
							<Icon size={20} color="black" name="email" style={{ paddingRight: 10 }} />
							<Text style={{ fontSize: 20 }}>{emailRedCloud}</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							Linking.openURL(webSiteRedCloud);
						}}
					>
						<View style={[stylesWhite.centerContent, { paddingBottom: 10 }]}>
							<Icon size={20} color="black" name="language" style={{ paddingRight: 10 }} />
							<Text style={{ fontSize: 20 }}>{webSiteRedCloud}</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	renderMaps() {
		let url = '';
		if (PlatformIsIos) {
			// iPhone
			url = `maps://app?${latitudeRedCloud}+${longitudeRedCloud}`;
		} else {
			// Android
			url = `google.navigation:q=${latitudeRedCloud}+${longitudeRedCloud}`;
		}

		return (
			<View style={{ paddingLeft: 15 }}>
				<TouchableOpacity
					onPress={() => {
						Linking.openURL(url);
					}}
				>
					<View style={[stylesWhite.centerContent, { paddingBottom: 10 }]}>
						<Icon size={20} color="black" name="place" style={{ paddingRight: 10 }} />
						<Text style={{ fontSize: 20 }}>{adresseRedCloud}</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}

	renderFormulaire() {
		return (
			<View>
				<Text style={{ fontSize: 18, marginBottom: 10 }}>Ou envoyez-nous un petit message !</Text>
				<Hoshi
					label={this.state.message ? '' : 'Votre message ...'}
					borderColor={'grey'}
					height={this.state.messageHeight}
					onChangeText={this.handleChangeText}
					value={this.state.message}
					multiline
					onContentSizeChange={(event) => {
						this.setState({ messageHeight: event.nativeEvent.contentSize.height });
					}}
					inputStyle={{ paddingBottom: 25, marginTop: 10 }}
				/>
				<View
					style={{
						paddingTop: 20,
						alignItems: 'center',
						flex: 1,
					}}
				>
					<RkButton
						rkType="dark"
						onPress={() => {
							console.log('To be sent !');
						}}
					>
						<RkText
							style={{
								color: 'white',
								textAlign: 'center',
							}}
						>
							Envoyer
						</RkText>
					</RkButton>
				</View>
			</View>
		);
	}

	render() {
		return (
			<KeyboardAvoidingView
				behavior="padding"
				keyboardVerticalOffset={70}
				style={stylesWhite.mainContentContainer}
			>
				<View style={stylesWhite.redStrip}>
					<Text style={stylesWhite.title}>Contact</Text>
				</View>
				<ScrollView
					style={stylesWhite.scrollViewContainer}
					ref={(ref) => {
						this.scrollView = ref;
					}}
					onContentSizeChange={() => {
						this.scrollView.scrollToEnd({ animated: true });
					}}
				>
					{this.renderInformations()}
					{this.renderMaps()}
					{this.renderFormulaire()}
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}

let Styles = {
	logoGoogleMaps: {
		width: 200,
		height: 200,
		resizeMode: 'stretch',
	},
};

export default Contact;
