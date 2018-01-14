import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { RkButton, RkText } from 'react-native-ui-kitten';

const styleFile = require('./style/styles');

export class Conditions extends React.Component {
	//eslint-disable-next-line
	static navigationOptions = {
		title: 'Création de ton compte',
	};

	constructor(props) {
		super(props);
		this.state = {
			reglement:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
		};
	}

	componentDidMount() {
		//Recupération du règlement à afficher depuis l'API Rest
		//getData(response => {
		//  this.setState({
		//    reglement: response.body
		//});
		//});
	}

	render() {
		const { navigate } = this.props.navigation;

		return (
			<View style={{ flex: 1, backgroundColor: 'white' }}>
				<View
					style={{
						backgroundColor: '#cc0000',
						paddingBottom: 15,
						paddingTop: 15,
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'flex-start',
					}}
				>
					<Text style={{ color: 'white', backgroundColor: 'black', padding: 10 }}>
						{' '}
						Règlement RedCloud Bar :{' '}
					</Text>
				</View>
				<View
					style={{
						backgroundColor: 'white',
						flex: 1,
						marginBottom: 10,
					}}
				>
					<ScrollView>
						<Text
							multiline
							style={{
								color: 'black',
								textAlign: 'justify',
								lineHeight: 20,
								paddingTop: 20,
								paddingBottom: 20,
							}}
						>
							{this.state.reglement}
						</Text>
					</ScrollView>
				</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
					}}
				>
					<Text
						style={{
							width: 250,
							paddingBottom: 10,
							marginTop: 10,
							borderTopColor: '#cc0000',
							borderTopWidth: 2,
						}}
					/>
				</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						marginBottom: 25,
					}}
				>
					<TouchableOpacity
						style={[styleFile.buttonConditions, { marginRight: 20 }]}
						onPress={() => {
							this.props.navigation.navigate('ListeJeux', { condition: false });
						}}
					>
						<View>
							<Text>Refuser</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						style={styleFile.buttonConditions}
						onPress={() => {
							this.props.navigation.navigate('ListeJeux', { condition: true });
						}}
					>
						<View>
							<Text>Accepter</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
