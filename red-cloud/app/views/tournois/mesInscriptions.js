import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { RkButton } from 'react-native-ui-kitten';
import Modal from 'react-native-modalbox';
import Moment from 'moment';

import { api, URL } from './../../rest/api';
import stylesWhite from './../../styles/StyleSheetW';
import LogoHeader from './../../components/avatar/logoHeader';

const styleFile = require('./styles');

const mapStateToProps = (state) => ({
	token: state.token,
});

class MesInscriptions extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		headerTitle: <LogoHeader />,
		color: 'white',
	};

	constructor(props) {
		super(props);
		this.state = {
			isFetching: true,
			data: [],
			modalVisible: false,
			msgModalPartie1: 'Vous êtes sur le point de vous désinscrire du tournoi "',
			msgModalPartie2: '". Êtes-vous certain de votre choix ?',
			nomTournoiAnnulation: '',
			tournoiToDisplay: {},
		};
		this.loadInscriptions();
		this.renderItem = this.renderItem.bind(this);
		this.renderModal = this.renderModal.bind(this);
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

	loadTournaments(idEvent, idTournoi) {
		this.setState({ isFetching: true });
		const url = URL.tournaments.replace('{$id}', idEvent);
		api()
			.get(url)
			.then((response) => {
				response.data.payload.map((tournoi) => {
					if (tournoi.id_tournoi === idTournoi) {
						this.setState({ tournoiToDisplay: tournoi });
					}
				});
				this.setState({ isFetching: false });
				this.props.navigation.navigate('PresentationEventTournoi', {
					item: this.state.tournoiToDisplay,
					eventDisplay: false,
					date: this.state.tournoiToDisplay.dateHeureDebut,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	keyExtractor(tournoi) {
		return tournoi.id_tournoi;
	}

	toogleModal() {
		this.setState({ modalVisible: !this.state.modalVisible });
	}

	renderModal() {
		return (
			<Modal
				style={{
					backgroundColor: 'transparent',
					justifyContent: 'center',
					alignItems: 'center',
					height: 400,
					width: 310,
				}}
				position={'center'}
				isOpen={this.state.modalVisible}
				backdropOpacity={0.95}
			>
				<RkButton rkType="clear">
					{this.state.msgModalPartie1 + this.state.nomTournoiAnnulation + this.state.msgModalPartie2}
				</RkButton>
				<View style={{ flexDirection: 'row' }}>
					<TouchableOpacity
						style={[styleFile.buttonConditions, { marginTop: 20, borderRadius: 5 }]}
						onPress={() => {
							this.toogleModal();
						}}
					>
						<View>
							<Text style={{ color: 'red' }}>Annuler</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styleFile.buttonConditions, { marginTop: 20, borderRadius: 5, marginLeft: 10 }]}
						onPress={() => {
							this.cancelInscription();
							this.toogleModal();
						}}
					>
						<View>
							<Text style={{ color: 'green' }}>Valider</Text>
						</View>
					</TouchableOpacity>
				</View>
			</Modal>
		);
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
							onPress={() => {
								this.loadTournaments(tournoi.event_id_event, tournoi.id_tournoi);
							}}
						/>
						<Button
							containerViewStyle={Styles.rightButton}
							backgroundColor="#cc0000"
							borderRadius={6}
							title="Désinscrire"
							onPress={() => {
								this.setState({ nomTournoiAnnulation: tournoi.titre });
								this.toogleModal();
							}}
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
					{this.state.isFetchingTournament && (
						<ActivityIndicator
							visible={this.state.isFetching}
							size="large"
							color="#cc0000"
							style={{ paddingTop: 15 }}
						/>
					)}
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
				{this.renderModal()}
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
