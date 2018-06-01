import React from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Image, TouchableOpacity, Text, KeyboardAvoidingView, Keyboard } from 'react-native';
import { SearchBar } from 'react-native-elements';

import { RkCard, RkText } from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { api, URL } from './../../rest/api';
import stylesWhite from './../../styles/StyleSheetW';
import LogoHeader from './../../components/avatar/logoHeader';

const mapStateToProps = (state) => ({
	token: state.token,
});

const imgErreur = require('../../assets/images/erreurBlack.png');

class Tournois extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		tabBarLabel: 'Évènements',
		tabBarIcon: () => {
			return <Icon size={24} color="red" name="event" />;
		},
		headerTitle: <LogoHeader />,
		color: 'white',
	};

	constructor(props) {
		super(props);
		this.renderItem = this.renderItem.bind(this);

		this.state = {
			data: [],
			dataFiltered: [],
			isFetching: true,
			userSearch: '',
			searchResult: true,
		};
		this.loadPosts();
		this.touchablePressed = false;
	}

	componentWillMount() {
		this.touchablePressed = false;
	}

	//Chargements de tous les évènements à afficher depuis le backend
	loadPosts() {
		api()
			.get(URL.posts)
			.then((response) => {
				this.setState({
					data: response.data.payload,
					dataFiltered: response.data.payload,
					isFetching: false,
				});
				if (this.state.userSearch !== '') {
					this.makeSearch(this.state.userSearch);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	//filtre les évènements en fonction de la recherche de l'utilisateur
	async makeSearch(searchingTerm) {
		if (searchingTerm === '') {
			//Obliger de faire ce test pour quand l'utilisateur efface le text de recherche sans cliquer sur la croix
			this.setState({ searchingTermTest: searchingTerm });
			await this.resetSearch();
		}
		let filteredData = [];
		if (this.state.data.length > 0) {
			filteredData = this.state.data.filter((Evenement) => {
				return Evenement.titre.toLowerCase().indexOf(searchingTerm.toLowerCase()) !== -1;
			});
		} else {
			filteredData = this.state.data.filter((Evenement) => {
				return Evenement.titre.toLowerCase().indexOf(searchingTerm.toLowerCase()) !== -1;
			});
		}
		this.setState({ dataFiltered: filteredData, userSearch: searchingTerm });
		this.setState({ searchResult: filteredData.length !== 0 });
	}

	//Remet la liste d'évènements à son état initial
	async resetSearch() {
		await this.setState({ dataFiltered: this.state.data });
	}

	//Retourne la date d'aujourd'hui formatée avec des "/" séparant chaque terme (jour, mois, année)
	todaysDate() {
		let today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth() + 1; //January is 0!
		const yyyy = today.getFullYear();

		if (dd < 10) {
			dd = `0 ${dd}`;
		}

		if (mm < 10) {
			mm = `0 ${mm}`;
		}
		today = `${dd}/${mm}/${yyyy}`;

		return today;
	}

	//Extraction de l'identifiant d'un évènement
	keyExtractor(post) {
		return post.id_event;
	}

	//Rendu d'un évènement. Réutilisé pour chacun des évènements.
	renderItem(info) {
		return (
			<TouchableOpacity
				delayPressIn={0}
				activeOpacity={0.8}
				onPress={() => {
					if (this.touchablePressed) return;
					this.props.navigation.navigate('PresentationEventTournoi', {
						item: info.item,
						eventDisplay: true,
						date: info.item.dateHeureDebut,
					});
					this.touchablePressed = true;
					setTimeout(() => {
						this.touchablePressed = false;
					}, 1000);
				}}
			>
				<RkCard rkType="blog" style={stylesWhite.cardTournament}>
					<Image rkCardImg source={{ uri: info.item.imageUri }} />

					<View rkCardContent style={stylesWhite.marginCardContent}>
						<View>
							<RkText style={stylesWhite.title} rkType="header4">
								{info.item.titre}
							</RkText>
							<RkText rkType="primary3 mediumLine" numberOfLines={2}>
								{info.item.description}
							</RkText>
						</View>

						<View rkCardFooter>
							<View>
								<RkText rkType="header6" />
							</View>
							<RkText rkType="secondary2 hintColor">{info.item.dateHeureDebut}</RkText>
						</View>
					</View>
					<View style={stylesWhite.redLineBottom} />
				</RkCard>
			</TouchableOpacity>
		);
	}

	//Rendu global du composant
	render() {
		return (
			<View style={stylesWhite.mainContentContainer}>
				<View style={stylesWhite.redStrip}>
					<Text style={stylesWhite.title}>Les tournois & Events</Text>
				</View>
				<SearchBar
					containerStyle={{ backgroundColor: 'white' }}
					lightTheme
					round
					clearIcon
					onChangeText={(input) => {
						this.makeSearch(input);
					}}
					onClearText={() => {
						this.resetSearch();
					}}
					placeholder="Rechercher..."
				/>
				{!this.state.searchResult && (
					<KeyboardAvoidingView
						style={stylesWhite.imgNoResultsContainer}
						behavior="padding"
						on
						keyboardVerticalOffset={100}
					>
						<Image style={stylesWhite.imgNoResultsTournoi} source={imgErreur} />
						<Text style={{ marginTop: 15 }}> Aucun évènement ne correspond à votre recherche...</Text>
					</KeyboardAvoidingView>
				)}
				<FlatList
					data={this.state.dataFiltered}
					renderItem={this.renderItem}
					keyExtractor={this.keyExtractor}
					refreshing={this.state.isFetching}
					onRefresh={() => {
						this.loadPosts();
					}}
				/>
			</View>
		);
	}
}

export default connect(mapStateToProps)(Tournois);
