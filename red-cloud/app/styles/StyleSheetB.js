import { StyleSheet } from 'react-native';

const stylesBlack = StyleSheet.create({
	redStrip: {
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
		fontSize: 16,
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
		lineHeight: 20,
		paddingTop: 10,
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
		height: '100%',
		width: '100%',
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

	posLoadingButton: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginBottom: 35,
	},
	placeholderInputSignup: {
		fontSize: 16,
		marginLeft: 18,
	},
	textInputSignup: {
		color: '#6a7989',
		fontSize: 18,
		fontWeight: 'bold',
		marginLeft: 18,
	},
});

export default stylesBlack;
