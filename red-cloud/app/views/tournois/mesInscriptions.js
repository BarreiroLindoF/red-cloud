import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View, Image, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { RkCard, RkText } from 'react-native-ui-kitten';
import Moment from 'moment';

import { api, URL } from './../../rest/api';
import stylesWhite from './../../styles/StyleSheetW';
import LogoHeader from './../../components/avatar/logoHeader';

const mapStateToProps = (state) => ({
	token: state.token,
});

const logoTest = require('../../assets/images/logo.png');

class MesInscriptions extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		headerTitle: <LogoHeader />,
		color: 'white',
	};

	constructor(props) {
		super(props);

		this.state = {
			isFetching: false,
			data: [],
		};
		this.loadInscriptions();
	}

	loadInscriptions() {
		api()
			.get(URL.inscriptions)
			.then((response) => {
				this.setState({
					isFetching: false,
					data: response.data.payload,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	keyExtractor(tournoi) {
		return tournoi.id_tournoi;
	}

	renderItem(item) {
		const tournoi = item.item;
		return (
			<View style={{ width: '100%', marginTop: 10 }}>
				<View
					style={{
						borderTopColor: 'gray',
						borderTopWidth: 1,
					}}
				/>
				<View
					style={{
						alignSelf: 'flex-start',
					}}
				>
					<Text style={Styles.tournoiTitle}>{tournoi.titre}</Text>
				</View>
				<View style={Styles.containerTournoi}>
					<View style={Styles.containerInfosTournoi}>
						<Image style={[Styles.middleCenter, Styles.img]} source={{ uri: tournoi.imageUri }} />
						<Text style={Styles.middleCenter}> Equipe : {tournoi.nom_equipe}</Text>
						<Text style={[Styles.middleCenter, { marginRight: 10 }]}>
							{Moment(tournoi.dateHeureDebut).format('D/mm/Y')},{' '}
							{Moment(tournoi.heureDebut, 'HH:mm:ss').format('HH:mm')}
						</Text>
					</View>

					<View style={Styles.containerButtons}>
						<Button
							containerViewStyle={Styles.leftButton}
							backgroundColor="#079b4d"
							borderRadius={6}
							title="Détails"
						/>
						<Button
							containerViewStyle={Styles.rightButton}
							backgroundColor="#cc0000"
							borderRadius={6}
							title="Désinscrire"
						/>
					</View>
				</View>
			</View>
		);
	}

	render() {
		return (
			<View style={{ height: '100%' }}>
				<Text style={Styles.inscriptionsTitle}>Mes inscriptions</Text>
				<ScrollView style={stylesWhite.mainContentContainer}>
					<FlatList
						style={{ paddingBottom: 40 }}
						data={this.state.data}
						renderItem={this.renderItem}
						keyExtractor={this.keyExtractor}
						refreshing={this.state.isFetching}
						onRefresh={() => {
							this.loadInscriptions();
						}}
					/>
				</ScrollView>
			</View>
		);
	}
}

const Styles = {
	containerTournoi: {
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	containerInfosTournoi: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 60,
		marginTop: 10,
	},
	containerButtons: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		marginTop: 10,
		paddingBottom: 15,
		borderBottomColor: 'gray',
		borderBottomWidth: 1,
	},
	leftButton: {
		flex: 1,
		marginLeft: 40,
	},
	rightButton: {
		flex: 1,
		marginRight: 40,
	},
	middleCenter: {
		alignSelf: 'center',
	},
	inscriptionsTitle: {
		fontWeight: '600',
		fontSize: 24,
		color: '#cc0000',
		paddingLeft: 10,
		paddingBottom: 15,
		paddingTop: 25,
		backgroundColor: 'white',
	},
	tournoiTitle: {
		fontWeight: '600',
		fontSize: 18,
		marginBottom: 10,
		marginTop: 15,
		color: 'white',
		backgroundColor: 'black',
		padding: 10,
		marginLeft: 10,
	},
	img: {
		marginLeft: 10,
		width: 50,
		height: 50,
	},
};

export default connect(mapStateToProps)(MesInscriptions);
