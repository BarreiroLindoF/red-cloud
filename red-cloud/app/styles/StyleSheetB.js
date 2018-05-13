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

	centerContent: {
		justifyContent: 'center',
		marginBottom: 5,
		flexDirection: 'row',
	},

	modalStyle: {
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		height: 400,
		width: 300,
	},

	modalButton: {
		padding: 10,
		backgroundColor: 'white',
		borderTopWidth: 1,
		borderBottomWidth: 2,
		borderLeftWidth: 2,
		borderRightWidth: 2,
		paddingRight: 50,
		paddingLeft: 50,
		marginTop: 20,
		borderRadius: 5,
	},
});

export default stylesBlack;
