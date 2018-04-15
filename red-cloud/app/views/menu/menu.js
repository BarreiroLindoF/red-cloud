import React from 'react';
import { Text, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StatusBarPaddingView } from './../../config/header';
import { api, URL } from './../../rest/api';

class Menu extends React.Component {
	// eslint-disable-next-line
	static navigationOptions = {
		header: null,
		tabBarLabel: 'Menu',
		tabBarIcon: () => {
			return <Icon size={24} color="red" name="local-bar" />;
		},
	};

	constructor(props) {
		super(props);
		this.state = {
			data: null,
		};
		this.loadData();
	}

	loadData() {
		api()
			.get(URL.menu)
			.then((response) => {
				console.log(response.data);
				this.setState(
					{
						data: response.data.payload,
					},
					console.log(this.state.data),
				);
				//console.log(response.data.payload.Nourritures[1]);
				//console.log(this.state.data.Nourritures);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	/*render() {
        return (
            <View>
                <StatusBarPaddingView />
                <View style={Styles.rubanHaut}>
					<Text style={Styles.title}>Menu</Text>
				</View>
                <View>
                    <Text style={Styles.subTitle}> Nourriture </Text>
                    <Text>{this.state.data}</Text>
                    <Text style={Styles.subTitle}> Boisson </Text>
                </View>
            </View>
        );
    }*/

	render() {
		return (
			<View>
				<Text>{this.state.data.Boissons[0].nom}</Text>
			</View>
		);
	}
}

const Styles = {
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
	subTitle: {
		color: 'black',
		fontSize: 30,
	},
};
export default Menu;
