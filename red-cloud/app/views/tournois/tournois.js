import React from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Image, TouchableOpacity, Text } from 'react-native';
import { RkCard, RkStyleSheet, RkText } from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StatusBarPaddingView } from './../../config/header';

import { api, URL } from './../../rest/api';

const mapStateToProps = (state) => ({
	token: state.token,
});

class Tournois extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		header: null,
		tabBarLabel: 'Events',
		tabBarIcon: () => {
			return <Icon size={24} color="red" name="event" />;
		},
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
			<View style={Styles.container}>
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
					<RkCard rkType="blog" style={styles.card}>
						<View rkCardHeader style={styles.content}>
							<RkText style={styles.section} rkType="header4">
								{info.item.titre}
							</RkText>
						</View>

						<Image rkCardImg source={{ uri: info.item.imageUri }} />

						<View rkCardContent>
							<View>
								<RkText rkType="primary3 mediumLine" numberOfLines={2}>
									{info.item.description}
								</RkText>
							</View>
						</View>

						<View rkCardFooter>
							<View style={styles.userInfo}>
								<RkText rkType="header6" />
							</View>
							<RkText rkType="secondary2 hintColor">{info.item.dateHeureDebut}</RkText>
						</View>
					</RkCard>
				</TouchableOpacity>
			</View>
		);
	}

	render() {
		return (
			<View style={Styles.container}>
				<StatusBarPaddingView />
				<View style={Styles.rubanHaut}>
					<Text style={Styles.title}>Événement</Text>
				</View>
				<FlatList
					data={this.state.data}
					renderItem={this.renderItem}
					keyExtractor={this.keyExtractor}
					refreshing={this.state.isFetching}
					onRefresh={() => {
						this.loadPosts();
					}}
					contentContainerStyle={styles.container}
				/>
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
	section: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	footer: {},
}));

let Styles = RkStyleSheet.create((theme) => ({
	containerCard: {
		backgroundColor: theme.colors.screen.scroll,
		paddingVertical: 8,
		paddingHorizontal: 12,
	},
	card: {
		marginVertical: 8,
	},
	centerContent: {
		alignItems: 'center',
	},
	boldText: {
		fontWeight: 'bold',
	},
	logo: {
		width: 200,
		height: 200,
		resizeMode: 'stretch',
	},
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
	containerScrollView: {
		backgroundColor: 'white',
		flex: 1,
		marginBottom: 10,
	},
}));

export default connect(mapStateToProps)(Tournois);
