import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { Text, View, ScrollView, SectionList, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { api, URL } from './../../rest/api';

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
			offresDispo: true,
			offres: [],
			sectionsBoissons: [],
			sectionsNourritures: [],
			isFetching: true,
			categoriesBoissons: [],
			i: 1,
		};

		this.renderCarousel = this.renderCarousel.bind(this);
	}

	//Appelée automatiquement au montage du composant, permet de charger les données avant que l'utilisateur ne voit le composant
	componentWillMount() {
		this.loadData();
		this.loadOffers();
	}

	//Charge les offres depuis le backend
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

	//Charge le menu depuis le backend
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

	//Permis de boucler sur un identifiant pour chaque élément "nourritue"
	keyExtractorNourriture(nourriture) {
		return nourriture.title;
	}

	//Permis de boucler sur un identifiant pour chaque élément "boisson"
	keyExtractorBoisson(boisson) {
		return boisson.title;
	}

	//Permis de boucler sur un identifiant pour chaque élément "offre"
	keyExtractorOffre(offre) {
		return offre.description;
	}

	//Rendu des en-têtes de section
	renderSectionHeader({ section }) {
		return (
			<View style={{ marginTop: 10, marginLeft: '2%' }}>
				<Text>{section.title}</Text>
				<View style={Styles.separatorContainer} />
			</View>
		);
	}

	//Rendu du composant qui affiches les offres et les fait défiler tous les "x" secondes
	renderCarousel(offre) {
		return (
			<View style={{ alignItems: 'center', width: Dimensions.get('window').width, paddingBottom: 15 }}>
				<Image
					source={{ uri: offre.item.imageUri }}
					style={{
						flex: 1,
						height: 200,
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center',
						resizeMode: 'stretch',
					}}
				/>
				<Text style={{ marginLeft: '6%', marginRight: '6%' }}>Prix : {offre.item.prix}.-</Text>
				<Text style={{ marginLeft: '6%', marginRight: '6%' }}>Début de l'offre : {offre.item.date_debut}</Text>
				<Text style={{ marginLeft: '6%', marginRight: '6%' }}>
					Fin de l'offre : {offre.item.date_expiration}
				</Text>
			</View>
		);
	}

	//Rendu global du composant
	render() {
		return (
			<View style={stylesWhite.mainContentContainer}>
				<View style={stylesWhite.redStrip}>
					<Text style={stylesWhite.title}>Menu</Text>
				</View>
				<ScrollView style={stylesWhite.scrollViewContainer}>
					<View style={{ paddingBottom: 15, paddingTop: 20 }}>
						<Text style={stylesWhite.subTitle}>{this.state.isFetching ? '' : 'Offres'}</Text>
					</View>
					<Carousel
						ref="carousel"
						data={this.state.offres}
						renderItem={this.renderCarousel}
						sliderWidth={Dimensions.get('window').width}
						itemWidth={Dimensions.get('window').width}
						autoplay
						loop
						autoplayInterval={3000}
						firstItem={0}
					/>
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
