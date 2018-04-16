import React from 'react';
import { Text, View, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RkStyleSheet } from 'react-native-ui-kitten';

import { StatusBarPaddingView } from './../../config/header';

import { api, URL } from './../../rest/api';

class Menu extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		header: null,
		tabBarLabel: 'Menu',
		tabBarIcon: () => {
			return <Icon size={24} color="red" name="local-bar" />;
		},
	};

	constructor(props) {
		super(props);
		this.state = {
			boissons: [],
			nourritures: [],
			isFetching: false,
		};
		this.loadData();
	}

	loadData() {
		this.setState({ isFetching: true });
		api()
			.get(URL.menu)
			.then((response) => {
				this.setState({
					isFetching: false,
					boissons: response.data.payload.boissons,
					nourritures: response.data.payload.nourritures,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	keyExtractorNourriture(nourriture) {
		return nourriture.id_nourriture;
	}

	keyExtractorBoisson(boisson) {
		return boisson.id_boisson;
	}

	renderNourriture(nourriture) {
		return (
			<View style={Styles.textContainer}>
				<View style={Styles.leftContainer}>
					<Text>{nourriture.item.nom}</Text>
				</View>
				<View style={Styles.rightContainer}>
					<Text>{nourriture.item.prix}.-</Text>
				</View>
			</View>
		);
	}

	renderBoisson(boisson) {
		return (
			<View style={Styles.textContainer}>
				<View style={Styles.leftContainer}>
					<Text>{boisson.item.nom}</Text>
				</View>
				<View style={Styles.rightContainer}>
					<Text>{boisson.item.prix}.-</Text>
				</View>
			</View>
		);
	}
	render() {
		return (
			<View>
				<StatusBarPaddingView />
				<View style={Styles.rubanHaut}>
					<Text style={Styles.title}>Menu</Text>
				</View>
				<ScrollView>
					<View>
						<Text style={Styles.subTitle}>Boissons</Text>
					</View>
					<FlatList
						data={this.state.boissons}
						renderItem={this.renderBoisson}
						keyExtractor={this.keyExtractorBoisson}
						refreshing={this.state.isFetching}
						onRefresh={() => {
							this.loadData();
						}}
						contentContainerStyle={styles.container}
					/>
					<View>
						<Text style={Styles.subTitle}>Nourritures</Text>
					</View>
					<FlatList
						data={this.state.nourritures}
						renderItem={this.renderNourriture}
						keyExtractor={this.keyExtractorNourriture}
						refreshing={false}
						onRefresh={() => {
							this.loadData();
						}}
						contentContainerStyle={styles.container}
					/>
				</ScrollView>
			</View>
		);
	}
}

const styles = RkStyleSheet.create((theme) => ({
	container: {
		backgroundColor: theme.colors.screen.scroll,
		paddingVertical: 8,
		paddingHorizontal: 12,
	},
}));

const Styles = {
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
	subTitle: {
		color: 'black',
		fontSize: 30,
	},
	textContainer: {
		flexDirection: 'row',
	},
	leftContainer: {
		flex: 1,
		alignItems: 'flex-start',
	},
	rightContainer: {
		flex: 1,
		alignItems: 'flex-end',
		marginRight: 20,
	},
};
export default Menu;
