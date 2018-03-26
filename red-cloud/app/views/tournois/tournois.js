import React from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Image, TouchableOpacity, Text } from 'react-native';
import { RkCard, RkText } from 'react-native-ui-kitten';
import { api, URL } from './../../rest/api';
import stylesWhite from './../../styles/StyleSheetW';
import LogoHeader from './../../components/avatar/logoHeader';

const mapStateToProps = (state) => ({
	token: state.token,
});

class Tournois extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		headerTitle: <LogoHeader />,
		color: 'white',
	};

	constructor(props) {
		super(props);

		this.renderItem = this.renderItem.bind(this);

		this.state = {
			data: [],
			isFetching: true,
		};

		this.loadPosts();
	}

	loadPosts() {
		api()
			.get(URL.posts)
			.then((response) => {
				this.setState({
					data: response.data.payload,
					isFetching: false,
				});
			})
			.catch((error) => {
				console.log(error);
			});
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
					this.props.navigation.navigate('PresentationTournoi', { tournoi: info.item });
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
					</View>

					<View rkCardFooter>
						<View>
							<RkText rkType="header6" />
						</View>
						<RkText rkType="secondary2 hintColor">{info.item.date}</RkText>
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
				<FlatList
					data={this.state.data}
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
