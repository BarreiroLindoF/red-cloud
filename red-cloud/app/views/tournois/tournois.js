import React from 'react';
import { FlatList, View, Image, TouchableOpacity } from 'react-native';
import { RkCard, RkStyleSheet, RkText } from 'react-native-ui-kitten';
import { getAllPosts } from '../../rest/httpRequest';

export class Tournois extends React.Component {
	static navigationOptions = {
		// eslint-disable-line no-undef
		title: 'Liste des tournois',
	};

	constructor(props) {
		super(props);

		this.renderItem = this.renderItem.bind(this);
		this.loadPosts = this.loadPosts.bind(this);

		this.state = {
			data: [],
			isFetching: true,
		};

		this.loadPosts();
	}

	loadPosts() {
		getAllPosts().then((response) => {
			const date = this.todaysDate();
			for (const element of response) {
				element.uri =
					'http://www.dlcompare.fr:8042/upload/cache/game_tetiere/img/counter-strike-source-img-4.jpg';
				element.date = date;
			}
			this.setState({
				data: response,
				isFetching: false,
			});
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
		return post.id;
	}

	renderItem(info) {
		return (
			<TouchableOpacity
				delayPressIn={70}
				activeOpacity={0.8}
				onPress={() => this.props.navigation.navigate('Exemple', { user: info.item.id })}
			>
				<RkCard rkType="blog" style={styles.card}>
					<View rkCardHeader style={styles.content}>
						<RkText style={styles.section} rkType="header4">
							{info.item.title}
						</RkText>
					</View>

					<Image rkCardImg source={{ uri: info.item.uri }} />

					<View rkCardContent>
						<View>
							<RkText rkType="primary3 mediumLine" numberOfLines={2}>
								{info.item.body}
							</RkText>
						</View>
					</View>

					<View rkCardFooter>
						<View style={styles.userInfo}>
							<RkText rkType="header6" />
						</View>
						<RkText rkType="secondary2 hintColor">{info.item.date}</RkText>
					</View>
				</RkCard>
			</TouchableOpacity>
		);
	}

	render() {
		return (
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
		);
	}
}

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
