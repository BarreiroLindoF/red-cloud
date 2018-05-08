import React from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Image, TouchableOpacity, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';

import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import { RkCard, RkText } from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { api, URL } from './../../rest/api';
import stylesWhite from './../../styles/StyleSheetW';
import LogoHeader from './../../components/avatar/logoHeader';

const mapStateToProps = (state) => ({
	token: state.token,
});

class Tournois extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		tabBarLabel: 'Events',
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
		};
		this.loadPosts();
	}

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
	}

	async resetSearch() {
		await this.setState({ dataFiltered: this.state.data });
	}

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

	keyExtractor(post) {
		return post.id_event;
	}

	renderItem(info) {
		return (
			<TouchableOpacity
				delayPressIn={70}
				activeOpacity={0.8}
				onPress={() => {
					this.props.navigation.navigate('PresentationEventTournoi', {
						item: info.item,
						eventDisplay: true,
						date: info.item.dateHeureDebut,
					});
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
