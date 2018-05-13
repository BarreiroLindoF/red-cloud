import React from 'react';
import { Text, View, ScrollView, SectionList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RkStyleSheet } from 'react-native-ui-kitten';

import { StatusBarPaddingView } from './../../config/header';

import { api, URL } from './../../rest/api';

//Styles import
import stylesWhite from './../../styles/StyleSheetW';
import LogoHeader from './../../components/avatar/logoHeader';

class Menu extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		tabBarLabel: 'Menu',
		tabBarIcon: () => {
			return <Icon size={24} color="red" name="local-bar" />;
		},
		headerTitle: <LogoHeader />,
		color: 'white',
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
			<View style={stylesWhite.mainContentContainer}>
				<StatusBarPaddingView />
				<View style={stylesWhite.redStrip}>
					<Text style={stylesWhite.title}>Menu</Text>
				</View>
				<ScrollView style={stylesWhite.scrollViewContainer}>
					<View>
						<Text style={stylesWhite.subTitle}>{this.state.isFetching ? '' : 'Boissons'}</Text>
					</View>
					<SectionList
						sections={this.state.sectionsBoissons}
						keyExtractor={this.keyExtractorBoisson}
						renderSectionHeader={this.renderSectionHeader}
						renderItem={renderItem}
					/>
					<View style={{ marginTop: '7%' }}>
						<Text style={stylesWhite.subTitle}>{this.state.isFetching ? '' : 'Nourritures'}</Text>
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

const Styles = {
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
