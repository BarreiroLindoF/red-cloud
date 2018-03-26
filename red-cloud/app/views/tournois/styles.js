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
});
