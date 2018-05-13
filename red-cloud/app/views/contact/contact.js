// React imports
import React from 'react';
import { Text, View, TouchableOpacity, Linking, Platform, Image, ScrollView } from 'react-native';

// External imports
import { phonecall, email } from 'react-native-communications';

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

	renderInformations() {
		return (
			<View>
				<TouchableOpacity
					onPress={() => {
						phonecall(cellPhoneNumber, true);
					}}
				>
					<Text style={stylesWhite.subTitle}>Numéro de téléphone : </Text>
					<Text>
						- Appuyer pour appeler
						{'\n'}
						{cellPhoneNumberFormatted}
						<Icon size={15} color="black" name="call" />
						{'\n'}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						// email(to, cc, bcc, subject, body)
						email([{ emailRedCloud }], null, null, null, null);
					}}
				>
					<Text style={stylesWhite.subTitle}>E-mail :</Text>
					<Text>
						- Appuyer pour contacter
						{'\n'}
						{emailRedCloud}
						{'\n'}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => {
						Linking.openURL(webSiteRedCloud);
					}}
				>
					<Text style={stylesWhite.subTitle}>Site web : </Text>
					<Text>
						- Appuyer pour ouvrir
						{'\n'}
						{webSiteRedCloud}
						{'\n'}
					</Text>
				</TouchableOpacity>

				<Text style={stylesWhite.subTitle}>Adresse :</Text>
				<Text>{adresseRedCloud}</Text>
			</View>
		);
	}

	renderMaps() {
		let url = '';
		let application = '';
		if (PlatformIsIos) {
			// iPhone
			url = `maps://app?${latitudeRedCloud}+${longitudeRedCloud}`;
			application = 'Plans';
		} else {
			// Android
			url = `google.navigation:q=${latitudeRedCloud}+${longitudeRedCloud}`;
			application = 'Google Maps';
		}

		return (
			<TouchableOpacity
				onPress={() => {
					Linking.openURL(url);
				}}
				style={stylesWhite.centerItems}
			>
				<Image source={mapImageSource} style={Styles.logoGoogleMaps} />
				<Text> Ouvrir sur {application}</Text>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<View style={stylesWhite.mainContentContainer}>
				<StatusBarPaddingView />
				<View style={stylesWhite.redStrip}>
					<Text style={stylesWhite.title}>Contact</Text>
				</View>
				<ScrollView style={stylesWhite.scrollViewContainer}>
					{this.renderInformations()}
					{this.renderMaps()}
				</ScrollView>
			</View>
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
