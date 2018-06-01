// React imports
import React from 'react';
import { Text, View, TouchableOpacity, Linking, Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import { RkButton, RkText, RkCard } from 'react-native-ui-kitten';

// External imports
import { phonecall, email } from 'react-native-communications';
import { Hoshi } from 'react-native-textinput-effects';

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// Api
import { api, URL } from '../../rest/api';

//Styles import
import stylesWhite from './../../styles/StyleSheetW';
import LogoHeader from './../../components/avatar/logoHeader';

// Global variables
const PlatformIsIos = Platform.OS === 'ios';

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
			telephone: '',
			telephoneFormat: '',
			emailRedCloud: '',
			webSiteRedCloud: '',
			adresse: '',
			latitude: '',
			longitude: '',
		};

		this.handleChangeText = this.handleChangeText.bind(this);
		this.loadEntrepriseData();
	}

	//Chargement des données de l'entreprise pour pouvoir les afficher après dans le composant
	loadEntrepriseData() {
		api()
			.get(URL.entreprise)
			.then((response) => {
				const entreprise = response.data.payload;
				this.setState({
					telephone: entreprise.telephone,
					telephoneFormat: entreprise.telephone_format,
					emailRedCloud: entreprise.email,
					webSiteRedCloud: entreprise.site_web,
					adresse: entreprise.adresse,
					latitude: entreprise.adresse_latitude,
					longitude: entreprise.adresse_longitude,
				});
			})
			.catch(() => {});
	}

	//Change l'état du state "message" par le paramètre fourni
	handleChangeText(message) {
		this.setState({ message });
	}

	//Rendu du bouton du numéro de téléphone de l'entreprise, renvoi sur l'application de téléphone par défaut en cas de clic de l'utilisateur
	renderPhoneCall() {
		return (
			<TouchableOpacity
				onPress={() => {
					phonecall(this.state.telephone, true);
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
						<Text style={Styles.paddingButton}>{this.state.telephoneFormat}</Text>
					</View>
				</RkCard>
			</TouchableOpacity>
		);
	}

	//Rendu du bouton de l'email de l'entreprise, renvoi sur l'application de mail par défaut en cas de clic de l'utilisateur
	renderEmail() {
		return (
			<TouchableOpacity
				onPress={() => {
					// email(to, cc, bcc, subject, body)
					email([this.state.emailRedCloud], null, null, null, null);
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
						<Text style={Styles.paddingButton}>{this.state.emailRedCloud}</Text>
					</View>
				</RkCard>
			</TouchableOpacity>
		);
	}

	//Render du bouton contenant le site de l'entreprise, renvoi à son navigateur internet par défaut avec l'adresse du site pré entrée
	renderURL() {
		return (
			<TouchableOpacity
				onPress={() => {
					Linking.openURL(this.state.webSiteRedCloud);
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
						<Text style={Styles.paddingButton}>{this.state.webSiteRedCloud}</Text>
					</View>
				</RkCard>
			</TouchableOpacity>
		);
	}

	//Rendu des informations de l'entreprise
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

	//Rendu conditionnellement à la plateforme du composant maps avec l'adresse du bar et qui fait un itinéraire avec la position actuelle de l'utilisateur
	renderMaps() {
		let url = '';
		if (PlatformIsIos) {
			// iPhone
			url = `maps://app?${this.state.latitude}+${this.state.longitude}`;
		} else {
			// Android
			url = `google.navigation:q=${this.state.latitude}+${this.state.longitude}`;
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
						<Text style={Styles.paddingButton}>{this.state.adresse}</Text>
					</View>
				</RkCard>
			</TouchableOpacity>
		);
	}

	//Rendu du formulaire de contact
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

	//Rendu global du composant
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
