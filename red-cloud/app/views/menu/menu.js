import React, { PureComponent } from 'react';
import { Text, View, ScrollView, SectionList, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RkStyleSheet } from 'react-native-ui-kitten';

import { StatusBarPaddingView } from './../../config/header';

import { api, URL } from './../../rest/api';

class Menu extends PureComponent {
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
			offres: [],
			sectionsBoissons: [],
			sectionsNourritures: [],
			isFetching: true,
			categoriesBoissons: [],
		};
	}

	componentWillMount() {
		this.loadData();
		this.loadOffers();
	}

	loadOffers() {
		api()
			.get(URL.offres)
			.then((response) => {
				this.setState({
					isFetching: false,
					offres: response.data.payload.offres,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	loadData() {
		api()
			.get(URL.menu)
			.then((response) => {
				this.setState({
					isFetching: false,
					sectionsBoissons: response.data.payload.boissons,
					sectionsNourritures: response.data.payload.nourritures,
					categoriesBoissons: [{ categorie_nom: 'Alcoolisées' }],
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	keyExtractorNourriture(nourriture) {
		return nourriture.title;
	}

	keyExtractorBoisson(boisson) {
		return boisson.title;
	}

	keyExtractorOffre(offre) {
		return offre.description;
	}

	renderSectionHeader({ section }) {
		return (
			<View style={{ marginTop: 10, marginLeft: '2%' }}>
				<Text>{section.title}</Text>
				<View style={Styles.separatorContainer} />
			</View>
		);
	}

	renderOffre(offre) {
		console.log(offre);
		return (
			<View>
				<Text style={{ marginLeft: '6%', marginRight: '6%' }}>{offre.item.description}</Text>
				<Text style={{ marginLeft: '6%', marginRight: '6%' }}>Prix : {offre.item.prix}.-</Text>
				<Text style={{ marginLeft: '6%', marginRight: '6%' }}>Début de l'offre : {offre.item.date_debut}</Text>
				<Text style={{ marginLeft: '6%', marginRight: '6%' }}>
					Fin de l'offre : {offre.item.date_expiration}
				</Text>
				<Text
					style={{
						marginLeft: '6%',
						marginRight: '6%',
						marginTop: '5%',
						marginBottom: '5%',
						borderBottomColor: 'black',
						borderBottomWidth: 0.5,
					}}
				/>
			</View>
		);
	}

	render() {
		return (
			<View style={Styles.container}>
				<StatusBarPaddingView />
				<View style={Styles.rubanHaut}>
					<Text style={Styles.title}>Menu</Text>
				</View>
				<ScrollView style={{ marginBottom: 30 }}>
					<View>
						<Text style={Styles.subTitle}>{this.state.isFetching ? '' : 'Offres'}</Text>
					</View>
					<FlatList
						data={this.state.offres}
						keyExtractor={this.keyExtractorOffre}
						renderItem={this.renderOffre}
					/>
					<View>
						<Text style={Styles.subTitle}>{this.state.isFetching ? '' : 'Boissons'}</Text>
					</View>
					<SectionList
						sections={this.state.sectionsBoissons}
						keyExtractor={this.keyExtractorBoisson}
						renderSectionHeader={this.renderSectionHeader}
						renderItem={renderItem}
					/>
					<View style={{ marginTop: '7%' }}>
						<Text style={Styles.subTitle}>{this.state.isFetching ? '' : 'Nourritures'}</Text>
					</View>
					<SectionList
						sections={this.state.sectionsNourritures}
						keyExtractor={this.keyExtractorNourriture}
						renderSectionHeader={this.renderSectionHeader}
						renderItem={renderItem}
					/>
				</ScrollView>
			</View>
		);
	}
}

const renderItem = ({ item }) => {
	return (
		<View style={Styles.textContainer}>
			<View style={Styles.leftContainer}>
				<Text>{item.title}</Text>
			</View>
			<View style={Styles.rightContainer}>
				<Text>{item.prix}.-</Text>
			</View>
		</View>
	);
};

const styles = RkStyleSheet.create((theme) => {
	return {
		container: {
			backgroundColor: theme.colors.screen.scroll,
			paddingVertical: 8,
			paddingHorizontal: 12,
		},
	};
});

const Styles = {
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	child: {
		justifyContent: 'center',
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
		marginLeft: '7%',
	},
	rightContainer: {
		flex: 1,
		alignItems: 'flex-end',
		marginRight: 20,
	},
	separatorContainer: {
		height: 1,
		backgroundColor: 'gray',
		marginBottom: 5,
		marginRight: '4%',
	},
};

export default Menu;
