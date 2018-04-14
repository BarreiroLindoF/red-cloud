import React from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modalbox';

const styleFile = require('./styles');
const imgRedCloud = require('./../../assets/images/logo.png');

class LstEquipe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalEquipesVisible: false,
			equipes: [
				{
					id: 1,
					nom: 'Equipe 1',
				},
				{
					id: 2,
					nom: 'Equipe 2',
				},
				{
					id: 3,
					nom: 'Equipe 3',
				},
				{
					id: 4,
					nom: 'Equipe 4',
				},
				{
					id: 5,
					nom: 'Equipe 5',
				},
			],
		};
	}

	FlatListItemSeparator = () => {
		return (
			<View style={styles.separatorContainer}>
				<View style={styles.separator} />
			</View>
		);
	};

	toggleModalEquipes() {
		this.setState({ modalEquipesVisible: !this.state.modalEquipesVisible });
	}

	keyExtractor(equipe) {
		return equipe.id;
	}

	renderLstEquipe() {
		return (
			<Modal
				style={{
					backgroundColor: 'transparent',
					alignItems: 'center',
					height: 250,
				}}
				backdropOpacity={0.5}
				position={'center'}
				isOpen={this.state.modalEquipesVisible}
			>
				<View style={styles.flatListContainer}>
					<FlatList
						style={styles.flatList}
						data={this.state.equipes}
						keyExtractor={this.keyExtractor}
						ItemSeparatorComponent={this.FlatListItemSeparator}
						renderItem={({ item }) => <Text style={styles.item}> {item.nom} </Text>}
					/>
				</View>
				<TouchableOpacity
					style={[styleFile.buttonConditions, { marginTop: 20, borderRadius: 5 }]}
					onPress={() => {
						this.toggleModalEquipes();
					}}
				>
					<View>
						<Text style={{ color: 'black' }}>Retour</Text>
					</View>
				</TouchableOpacity>
			</Modal>
		);
	}

	render() {
		return (
			<View style={{ height: 800, width: 400 }}>
				{this.renderLstEquipe()}
				<View>
					<Button
						title="Click on me !"
						onPress={() => {
							this.toggleModalEquipes();
						}}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	flatListContainer: {
		width: 250,
		borderRadius: 10,
		backgroundColor: 'white',
		flex: 1,
		paddingBottom: 10,
	},

	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
	flatlist: {
		width: 250,
		paddingTop: 10,
	},
	separatorContainer: {
		height: 1,
		width: '100%',
		alignItems: 'center',
	},
	separator: {
		height: 1,
		backgroundColor: 'grey',
		width: '85%',
	},
});

export default LstEquipe;
