// React imports
import React from 'react';
import { Text, View, TouchableOpacity, Linking, Platform, Image } from 'react-native';

// External imports
import { phonecall, email } from 'react-native-communications';

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// Configurations imports
import { StatusBarPaddingView } from './../../config/header';

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
		header: null,
		tabBarLabel: 'Contact',
		tabBarIcon: () => {
			return <Icon size={24} color="red" name="place" />;
		},
	};

	renderInformations() {
		return (
			<View>
				<TouchableOpacity
					onPress={() => {
						phonecall(cellPhoneNumber, true);
					}}
				>
					<Text style={Styles.boldText}>Numéro de téléphone : - Appuyer pour appeler</Text>
					<Text>
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
					<Text style={Styles.boldText}>E-mail : - Appuyer pour contacter</Text>
					<Text>
						{emailRedCloud}
						{'\n'}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => {
						Linking.openURL(webSiteRedCloud);
					}}
				>
					<Text style={Styles.boldText}>Site web : - Appuyer pour ouvrir</Text>
					<Text>
						{webSiteRedCloud}
						{'\n'}
					</Text>
				</TouchableOpacity>

				<Text style={Styles.boldText}>Adresse :</Text>
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
				style={Styles.centerContent}
			>
				<Image source={mapImageSource} style={Styles.logo} />
				<Text> Ouvrir sur {application}</Text>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<View style={Styles.container}>
				<StatusBarPaddingView />
				<View style={Styles.rubanHaut}>
					<Text style={Styles.title}>Contact</Text>
				</View>
				<View style={Styles.containerScrollView}>
					{this.renderInformations()}
					{this.renderMaps()}
				</View>
			</View>
		);
	}
}

let Styles = {
	centerContent: {
		alignItems: 'center',
	},
	boldText: {
		fontWeight: 'bold',
	},
	logo: {
		width: 200,
		height: 200,
		resizeMode: 'stretch',
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
};

export default Contact;
