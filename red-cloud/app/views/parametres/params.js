import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { RkCard, RkText, RkStyleSheet } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StatusBarPaddingView } from './../../config/header';
import { resetStore } from './../../redux/actions';

const mapDispatchToProps = (dispatch) => ({
	resetStore: () => {
		dispatch(resetStore());
	},
});

class Params extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		header: null,
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

	renderDeconnexion() {
		return (
			<TouchableOpacity
				onPress={() => {
					this.props.resetStore();
					this.openLoginView();
				}}
			>
				<RkCard rkType="blog" style={styles.card}>
					<View rkCardContent>
						<RkText rkType="primary3 mediumLine">
							<Icon size={24} color="red" name="power-settings-new" />
							<Text>Description</Text>
						</RkText>
					</View>
				</RkCard>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<View>
				<StatusBarPaddingView />
				<View style={styles.container}>{this.renderDeconnexion()}</View>
			</View>
		);
	}
}

//eslint-disable-next-line
const styles = RkStyleSheet.create((theme) => ({
	container: {
		backgroundColor: theme.colors.screen.scroll,
		paddingVertical: 8,
		paddingHorizontal: 12,
	},
	card: {
		marginVertical: 8,
	},
}));

export default connect(null, mapDispatchToProps)(Params);
