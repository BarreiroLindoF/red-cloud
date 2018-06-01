import React from 'react';
import { Text, View, TouchableOpacity, Switch, ScrollView, KeyboardAvoidingView } from 'react-native';
import { RkCard, RkStyleSheet } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { resetStore, updateNotificationOffre } from './../../redux/actions';
import { api, URL } from '../../rest/api';
import stylesWhite from './../../styles/StyleSheetW';
import LogoHeader from './../../components/avatar/logoHeader';
import RecupMotDePasse from './../login/recupMotDePasse';

const mapDispatchToProps = (dispatch) => ({
	resetStore: () => {
		dispatch(resetStore());
	},
	updateNotificationOffre: (offre) => {
		dispatch(updateNotificationOffre(offre));
	},
});

const mapStateToProps = (state) => {
	return {
		notificationOffre: state.notificationOffre,
	};
};

class Params extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		headerTitle: <LogoHeader />,
		color: 'white',
		tabBarLabel: 'Paramètres',
		tabBarIcon: () => {
			return <Icon size={24} color="red" name="settings" />;
		},
	};

	constructor(props) {
		super(props);
		this.state = {
			recupOpen: false,
		};
		this.toggleSwitch = this.toggleSwitch.bind(this);
		this.touchablePressed = false;
	}

	//Déconnecte l'utilisateur dans le backend (supprime son token qui lui permet d'accéder aux vues sécurisées)
	deconnect() {
		api()
			.get(URL.deconnexion)
			.then(() => {})
			.catch(() => {});
	}

	//Ouvre la vue de login et reset le stack de navigation
	openLoginView() {
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'Login' })],
		});
		this.props.navigation.dispatch(resetAction);
	}

	//Ouvre la liste des jeux favoris de l'utilisateur en précisant qu'il est en mode "modification de données"
	openListeJeuxView() {
		this.props.navigation.navigate('ListeJeux', {
			isSigningUp: false,
		});
	}

	//Change l'état du bouton de notifications des offres et fait une requête au backend pour lui signifier la modification de l'utilisateur
	toggleSwitch() {
		const offre = this.props.notificationOffre === 1 ? 0 : 1;
		this.props.updateNotificationOffre(offre);
		api()
			.patch(URL.notificationOffre, {
				notification_offre: offre,
			})
			.then(() => {})
			.catch(() => {});
	}

	//Ouvre la vue de modification des données de l'utilisateur
	openModificationView() {
		this.props.navigation.navigate('Signup', {
			isSigningUp: false,
		});
	}

	//Rendu du bouton déconnexion. Remise à zéro de toutes les valeurs dans le store de redux et ouverture de la vue de login
	renderDeconnexion() {
		return (
			<TouchableOpacity
				onPress={() => {
					if (this.touchablePressed) return;
					this.deconnect();
					this.props.resetStore();
					this.openLoginView();
					this.touchablePressed = true;
					setTimeout(() => {
						this.touchablePressed = false;
					}, 1000);
				}}
			>
				<RkCard rkType="blog" style={stylesWhite.card}>
					<View rkCardContent style={stylesWhite.centerContent}>
						<Icon
							size={24}
							color="#cc0000"
							name="power-settings-new"
							style={{
								alignContent: 'center',
							}}
						/>
						<Text style={Styles.paddingButton}>Déconnexion</Text>
					</View>
				</RkCard>
			</TouchableOpacity>
		);
	}

	//Rendu du bouton "jeux favoris"
	renderJeuxFavoris() {
		return (
			<TouchableOpacity
				onPress={() => {
					if (this.touchablePressed) return;
					this.openListeJeuxView();
					this.touchablePressed = true;
					setTimeout(() => {
						this.touchablePressed = false;
					}, 1000);
				}}
			>
				<RkCard rkType="blog" style={stylesWhite.card}>
					<View rkCardContent style={stylesWhite.centerContent}>
						<Icon
							size={24}
							color="#cc0000"
							name="games"
							style={{
								alignContent: 'center',
							}}
						/>
						<Text style={Styles.paddingButton}>Modifier jeux favoris</Text>
					</View>
				</RkCard>
			</TouchableOpacity>
		);
	}

	//Rendu du bouton de notification des offres
	renderNotificationOffres() {
		return (
			<View style={{ paddingBottom: 25 }}>
				<TouchableOpacity
					onPress={() => {
						if (this.touchablePressed) return;
						this.toggleSwitch();
						this.touchablePressed = true;
						setTimeout(() => {
							this.touchablePressed = false;
						}, 1000);
					}}
				>
					<RkCard rkType="blog" style={stylesWhite.card}>
						<View rkCardContent style={stylesWhite.centerContent}>
							<Icon
								size={24}
								color="#cc0000"
								name="notifications-active"
								style={{
									alignContent: 'center',
								}}
							/>
							<Text style={{ paddingLeft: 10 }}>Notifiez-moi des offres</Text>
							<View style={Styles.alignRight}>
								<Switch
									onTintColor="#f77474"
									thumbTintColor={this.props.notificationOffre === 1 ? 'red' : 'grey'}
									onValueChange={this.toggleSwitch}
									value={this.props.notificationOffre === 1}
								/>
							</View>
						</View>
					</RkCard>
				</TouchableOpacity>
			</View>
		);
	}

	//Rendu du bouton de modification de profil
	renderModificationProfil() {
		return (
			<TouchableOpacity
				onPress={() => {
					if (this.touchablePressed) return;
					this.openModificationView();
					this.touchablePressed = true;
					setTimeout(() => {
						this.touchablePressed = false;
					}, 1000);
				}}
			>
				<RkCard rkType="blog" style={stylesWhite.card}>
					<View rkCardContent style={stylesWhite.centerContent}>
						<Icon
							size={24}
							color="#cc0000"
							name="face"
							style={{
								alignContent: 'center',
							}}
						/>
						<Text style={{ paddingLeft: 10 }}>Modifier mon profil</Text>
					</View>
				</RkCard>
			</TouchableOpacity>
		);
	}

	//Rendu du bouton de modification de mot de passe
	renderModificationPassword() {
		return (
			<TouchableOpacity
				onPress={() => {
					if (this.touchablePressed) return;
					this.setState({ recupOpen: true });
					this.touchablePressed = true;
					setTimeout(() => {
						this.touchablePressed = false;
					}, 1000);
				}}
			>
				<RkCard rkType="blog" style={stylesWhite.card}>
					<View rkCardContent style={stylesWhite.centerContent}>
						<Icon
							size={24}
							color="#cc0000"
							name="lock"
							style={{
								alignContent: 'center',
							}}
						/>
						<Text style={{ paddingLeft: 10 }}>Modifier mot de passe</Text>
					</View>
				</RkCard>
			</TouchableOpacity>
		);
	}

	//Rendu du boutons de "mes inscriptions" aux tournois
	renderMesInscriptions() {
		return (
			<TouchableOpacity
				onPress={() => {
					if (this.touchablePressed) return;
					this.props.navigation.navigate('MesInscriptions');
					this.touchablePressed = true;
					setTimeout(() => {
						this.touchablePressed = false;
					}, 1000);
				}}
			>
				<RkCard rkType="blog" style={stylesWhite.card}>
					<View rkCardContent style={stylesWhite.centerContent}>
						<Icon
							size={24}
							color="#cc0000"
							name="playlist-add-check"
							style={{
								alignContent: 'center',
							}}
						/>
						<Text style={{ paddingLeft: 10 }}>Mes inscriptions</Text>
					</View>
				</RkCard>
			</TouchableOpacity>
		);
	}

	//Rendu global du composant
	render() {
		return (
			<KeyboardAvoidingView style={stylesWhite.mainContentContainer} behavior="padding">
				<View style={stylesWhite.redStrip}>
					<Text style={stylesWhite.title}>Paramètres</Text>
				</View>
				<ScrollView keyboardShouldPersistTaps="handled">
					<View style={Styles.containerCard}>{this.renderDeconnexion()}</View>
					<View style={Styles.containerCard}>{this.renderJeuxFavoris()}</View>
					<View style={Styles.containerCard}>{this.renderMesInscriptions()}</View>
					<View style={Styles.containerCard}>{this.renderModificationProfil()}</View>
					<View style={Styles.containerCard}>{this.renderModificationPassword()}</View>
					<View style={Styles.containerCard}>{this.renderNotificationOffres()}</View>
					<RecupMotDePasse
						open={this.state.recupOpen}
						closeModal={() => {
							this.setState({ recupOpen: false });
						}}
						modifMdp
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}

let Styles = RkStyleSheet.create((theme) => ({
	containerCard: {
		backgroundColor: theme.colors.screen.scroll,
		paddingVertical: 8,
		paddingHorizontal: 12,
	},

	paddingButton: {
		paddingLeft: 10,
	},
	alignRight: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	verticalCenter: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 5,
	},
}));

export default connect(mapStateToProps, mapDispatchToProps)(Params);
