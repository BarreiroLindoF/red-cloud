import { StyleSheet } from 'react-native';

const stylesBlack = StyleSheet.create({
	title: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 25,
		width: 250,
	},

	scrollViewContainer: {
		flex: 1,
		marginBottom: 10,
	},

	mainContentContainer: {
		flex: 1,
		backgroundColor: 'black',
	},

	mainText: {
		color: 'white',
		textAlign: 'justify',
		lineHeight: 20,
		paddingTop: 10,
	},

	linkText: {
		color: 'red',
	},

	btnPosition: {
		marginTop: 15,
		flexDirection: 'row',
		justifyContent: 'center',
	},

	btnStyle: {
		backgroundColor: 'white',
	},

	btnFont: {
		color: 'black',
		fontWeight: 'bold',
	},

	footerAccounts: {
		justifyContent: 'center',
		marginBottom: 5,
		flexDirection: 'row',
	},
});

export default stylesBlack;
