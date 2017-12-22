import React from 'react'
import { Text, FlatList, View, Image, TouchableOpacity } from 'react-native'
import { RkCard, RkStyleSheet, RkText } from 'react-native-ui-kitten'
import { Avatar } from '../../components/avatar'

export class Tournois extends React.Component {
	static navigationOptions = {
		title: 'Liste des tournois',
	}

	constructor(props) {
		super(props)

		this.renderItem = this._renderItem.bind(this)

		data = [
			{
				id: 1,
				titre: 'Counter Strike - Global Offensive',
				content:
					"L'action des joueurs de Counter-Strike se déroule en plusieurs " +
					"manches, ou rounds, d'une durée par défaut de cinq minutes2, sur une carte" +
					" de jeu, ou map. Une équipe de terroristes affronte une équipe d'antiterroristes",
				uri: 'http://www.dlcompare.fr:8042/upload/cache/game_tetiere/img/counter-strike-source-img-4.jpg',
				date: this.todaysDate(),
			},
			{
				id: 2,
				titre: 'HearthStone',
				content:
					'Rangez votre épée, sortez votre deck et préparez-vous pour Hearthstone.' +
					' Les règles de ce jeu de cartes et de stratégie sont simples, mais vous pouvez vous' +
					' attendre à des défis épiques et intenses ! Jouez gratuitement, utilisez vos cartes ' +
					'pour jeter des sorts, invoquer des créatures et donner des ordres aux héros de Warcraft ' +
					'lors de duels légendaires et stratégiques.',
				uri: 'http://geeko.lesoir.be/wp-content/uploads/sites/58/2015/06/hearthstone1.jpg',
				date: this.todaysDate(),
			},
		]
		this.state = {
			data,
			isFetching: false,
		}
	}

	todaysDate() {
		let today = new Date()
		let dd = today.getDate()
		let mm = today.getMonth() + 1 //January is 0!
		let yyyy = today.getFullYear()

		if (dd < 10) {
			dd = '0' + dd
		}

		if (mm < 10) {
			mm = '0' + mm
		}

		today = dd + '/' + mm + '/' + yyyy
		return today
	}

	_keyExtractor(post, index) {
		return post.id
	}

	_renderItem(info) {
		return (
			<TouchableOpacity
				delayPressIn={70}
				activeOpacity={0.8}
				onPress={() => this.props.navigation.navigate('Exemple', { user: info.item.id })}
			>
				<RkCard rkType="blog" style={styles.card}>
					<View rkCardHeader style={styles.content}>
						<RkText style={styles.section} rkType="header4">
							{info.item.titre}
						</RkText>
					</View>

					<Image rkCardImg source={{ uri: info.item.uri }} />

					<View rkCardContent>
						<View>
							<RkText rkType="primary3 mediumLine" numberOfLines={2}>
								{info.item.content}
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
		)
	}

	render() {
		const { navigate } = this.props.navigation
		return (
			<FlatList
				data={this.state.data}
				renderItem={this.renderItem}
				keyExtractor={this._keyExtractor}
				refreshing={this.state.isFetching}
				onRefresh={() => {
					console.log('Getting new data')
				}}
				contentContainerStyle={styles.container}
			/>
		)
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
}))
