import React from 'react';
import { Text, View, TouchableOpacity, Switch, ScrollView, KeyboardAvoidingView } from 'react-native';
import { RkCard, RkText, RkStyleSheet } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StatusBarPaddingView } from './../../config/header';
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
	}

	deconnect() {
		api()
			.get(URL.deconnexion)
			.then(() => {})
			.catch(() => {});
	}

	openLoginView() {
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'Login' })],
		});
		this.props.navigation.dispatch(resetAction);
	}

	openListeJeuxView() {
		this.props.navigation.navigate('ListeJeux', {
			isSigningUp: false,
		});
	}

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

	openModificationView() {
		this.props.navigation.navigate('Signup', {
			isSigningUp: false,
		});
	}

	renderDeconnexion() {
		return (
			<TouchableOpacity
				onPress={() => {
					this.deconnect();
					this.props.resetStore();
					this.openLoginView();
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

	renderJeuxFavoris() {
		return (
			<TouchableOpacity
				onPress={() => {
					this.openListeJeuxView();
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

	renderNotificationOffres() {
		return (
			<View style={{ paddingBottom: 25 }}>
				<TouchableOpacity
					onPress={() => {
						this.toggleSwitch();
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

	renderModificationProfil() {
		return (
			<TouchableOpacity
				onPress={() => {
					this.openModificationView();
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

	renderModificationPassword() {
		return (
			<TouchableOpacity
				onPress={() => {
					this.setState({ recupOpen: true });
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

	renderMesInscriptions() {
		return (
			<TouchableOpacity
				onPress={() => {
					this.props.navigation.navigate('MesInscriptions');
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

	render() {
		return (
			<KeyboardAvoidingView style={stylesWhite.mainContentContainer} behavior="padding">
				<View style={stylesWhite.redStrip}>
					<Text style={stylesWhite.title}>Paramètres</Text>
				</View>
				<ScrollView>
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
