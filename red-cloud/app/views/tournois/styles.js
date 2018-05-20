import { Dimensions } from 'react-native';

const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
	screen: {
		padding: 10,
		flex: 1,
		backgroundColor: 'black',
		justifyContent: 'space-between',
	},
	buttonConditions: {
		padding: 10,
		backgroundColor: 'white',
		borderTopWidth: 1,
		borderBottomWidth: 2,
		borderLeftWidth: 2,
		borderRightWidth: 2,
		paddingRight: 50,
		paddingLeft: 50,
	},

	imgNoResultsTournoi: {
		resizeMode: 'center',
		height: 80,
		width: Dimensions.get('window').width - 80,
	},
	imgNoResultsContainer: {
		alignItems: 'center',
		flex: 3,
		justifyContent: 'center',
	},
	modal: {
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		width: 310,
	},
});
