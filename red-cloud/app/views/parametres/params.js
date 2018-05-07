import React from 'react';
import { Text, View, TouchableOpacity, Switch } from 'react-native';
import { RkCard, RkText, RkStyleSheet } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StatusBarPaddingView } from './../../config/header';
import { resetStore, updateNotificationOffre } from './../../redux/actions';
import { api, URL } from '../../rest/api';

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
		header: null,
		tabBarLabel: 'Paramètres',
		tabBarIcon: () => {
			return <Icon size={24} color="red" name="settings" />;
		},
	};

	constructor(props) {
		super(props);
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

	renderDeconnexion() {
		return (
			<TouchableOpacity
				onPress={() => {
					this.deconnect();
					this.props.resetStore();
					this.openLoginView();
				}}
			>
				<RkCard rkType="blog" style={Styles.card}>
					<View rkCardContent style={Styles.centerContent}>
						<Icon
							size={24}
							color="#cc0000"
							name="power-settings-new"
							style={{
								alignContent: 'center',
							}}
						/>
						<Text style={{ paddingLeft: 10 }}>Déconnexion</Text>
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
				<RkCard rkType="blog" style={Styles.card}>
					<View rkCardContent style={Styles.centerContent}>
						<Icon
							size={24}
							color="#cc0000"
							name="games"
							style={{
								alignContent: 'center',
							}}
						/>
						<Text style={{ paddingLeft: 10 }}>Modifier jeux favoris</Text>
					</View>
				</RkCard>
			</TouchableOpacity>
		);
	}

	toggleSwitch() {
		this.props.updateNotificationOffre(this.props.notificationOffre === 1 ? 0 : 1);
	}

	renderNotificationOffres() {
		return (
			<View>
				<Text>Je veux être notifié ouais {this.props.notificationOffre}</Text>
				<Switch onValueChange={this.toggleSwitch} value={this.props.notificationOffre === 1} />
			</View>
		);
	}

	render() {
		return (
			<View style={Styles.container}>
				<StatusBarPaddingView />
				<View style={Styles.rubanHaut}>
					<Text style={Styles.title}>Paramètres</Text>
				</View>
				<View style={Styles.containerCard}>{this.renderDeconnexion()}</View>
				<View style={Styles.containerCard}>{this.renderJeuxFavoris()}</View>
				{this.renderNotificationOffres()}
			</View>
		);
	}
}

let Styles = RkStyleSheet.create((theme) => ({
	containerCard: {
		backgroundColor: theme.colors.screen.scroll,
		paddingVertical: 8,
		paddingHorizontal: 12,
	},
	card: {
		marginVertical: 8,
	},
	centerContent: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
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
}));

export default connect(mapStateToProps, mapDispatchToProps)(Params);
