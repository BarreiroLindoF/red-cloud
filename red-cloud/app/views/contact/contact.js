// React imports
import React from 'react';
import { Text, View, TouchableOpacity, Linking, Platform, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import { RkButton, RkText, RkCard } from 'react-native-ui-kitten';

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

	renderPhoneCall() {
		return (
			<TouchableOpacity
				onPress={() => {
					phonecall(cellPhoneNumber, true);
				}}
			>
				<RkCard rkType="blog" style={stylesWhite.card}>
					<View rkCardContent style={stylesWhite.centerContent}>
						<Icon
							size={24}
							color="#cc0000"
							name="call"
							style={{
								alignContent: 'center',
							}}
						/>
						<Text style={Styles.paddingButton}>{cellPhoneNumberFormatted}</Text>
					</View>
				</RkCard>
			</TouchableOpacity>
		);
	}

	renderEmail() {
		return (
			<TouchableOpacity
				onPress={() => {
					// email(to, cc, bcc, subject, body)
					email([emailRedCloud], null, null, null, null);
				}}
			>
				<RkCard rkType="blog" style={stylesWhite.card}>
					<View rkCardContent style={stylesWhite.centerContent}>
						<Icon
							size={24}
							color="#cc0000"
							name="email"
							style={{
								alignContent: 'center',
							}}
						/>
						<Text style={Styles.paddingButton}>{emailRedCloud}</Text>
					</View>
				</RkCard>
			</TouchableOpacity>
		);
	}

	renderURL() {
		return (
			<TouchableOpacity
				onPress={() => {
					Linking.openURL(webSiteRedCloud);
				}}
			>
				<RkCard rkType="blog" style={stylesWhite.card}>
					<View rkCardContent style={stylesWhite.centerContent}>
						<Icon
							size={24}
							color="#cc0000"
							name="language"
							style={{
								alignContent: 'center',
							}}
						/>
						<Text style={Styles.paddingButton}>{webSiteRedCloud}</Text>
					</View>
				</RkCard>
			</TouchableOpacity>
		);
	}

	renderInformations() {
		return (
			<View>
				<Text style={{ fontSize: 18, marginBottom: 10 }}>
					Contactez et retrouvez-nous à l'aide des liens suivants :
				</Text>
				{this.renderPhoneCall()}
				{this.renderEmail()}
				{this.renderURL()}
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
			<TouchableOpacity
				onPress={() => {
					Linking.openURL(url);
				}}
			>
				<RkCard rkType="blog" style={stylesWhite.card}>
					<View rkCardContent style={stylesWhite.centerContent}>
						<Icon
							size={24}
							color="#cc0000"
							name="place"
							style={{
								alignContent: 'center',
							}}
						/>
						<Text style={Styles.paddingButton}>{adresseRedCloud}</Text>
					</View>
				</RkCard>
			</TouchableOpacity>
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
							this.setState({ message: '' });
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
					<View style={{ paddingHorizontal: 12 }}>
						{this.renderInformations()}
						{this.renderMaps()}
						{this.renderFormulaire()}
					</View>
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
	paddingButton: {
		paddingLeft: 10,
	},
};

export default Contact;
