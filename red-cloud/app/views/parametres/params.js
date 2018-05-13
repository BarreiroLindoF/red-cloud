import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { RkCard, RkText, RkStyleSheet } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StatusBarPaddingView } from './../../config/header';
import { resetStore } from './../../redux/actions';
import stylesWhite from './../../styles/StyleSheetW';
import LogoHeader from './../../components/avatar/logoHeader';

const mapDispatchToProps = (dispatch) => ({
	resetStore: () => {
		dispatch(resetStore());
	},
});

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

	render() {
		return (
			<View style={stylesWhite.mainContentContainer}>
				<StatusBarPaddingView />
				<View style={stylesWhite.redStrip}>
					<Text style={stylesWhite.title}>Paramètres</Text>
				</View>
				<View style={Styles.containerCard}>{this.renderDeconnexion()}</View>
				<View style={Styles.containerCard}>{this.renderJeuxFavoris()}</View>
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

	paddingButton: {
		paddingLeft: 10,
	},
}));

export default connect(null, mapDispatchToProps)(Params);
