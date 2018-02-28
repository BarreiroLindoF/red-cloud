import React from 'react';
import { FlatList, View, Image, TouchableOpacity } from 'react-native';
import { RkCard, RkStyleSheet, RkText } from 'react-native-ui-kitten';
import { getAllPosts } from '../../rest/httpRequest';

export class CreateTeam extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		title: "Création d'une team",
	};

	constructor(props) {
		super(props);

		//this.renderItem = this.renderItem.bind(this);
		this.loadPosts = this.loadPosts.bind(this);

		this.state = {
			data: [],
			isFetching: true,
		};

		this.loadPosts();
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
