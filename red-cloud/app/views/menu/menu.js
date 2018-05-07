import React from 'react';
import { Text, View, FlatList, ScrollView, SectionList } from 'react-native';
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
			sectionsBoissons: [],
			sectionsNourritures: [],
			isFetching: true,
			categoriesBoissons: [],
		};
	}

	componentWillMount() {
		this.loadData();
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
				console.log(response.data.payload.boissons);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	keyExtractorNourriture(nourriture) {
		return nourriture.id_nourriture;
	}

	keyExtractorBoisson(boisson) {
		return boisson.title;
	}

	renderSectionHeader({ section }) {
		return (
			<View style={{ marginTop: 10, marginLeft: '2%' }}>
				<Text>{section.title}</Text>
				<View style={Styles.separatorContainer} />
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

const styles = RkStyleSheet.create((theme) => ({
	container: {
		backgroundColor: theme.colors.screen.scroll,
		paddingVertical: 8,
		paddingHorizontal: 12,
	},
}));

const Styles = {
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
