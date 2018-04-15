import { StyleSheet } from 'react-native';

const stylesWhite = StyleSheet.create({
	redStrip: {
		backgroundColor: '#cc0000',
		paddingBottom: 10,
		paddingTop: 10,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
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

	mainText: {
		color: 'black',
		textAlign: 'justify',
		lineHeight: 20,
		paddingTop: 10,
	},

	cardTournament: {
		marginVertical: 8,
	},

	marginCardContent: {
		margin: -15,
	},

	redLineBottom: {
		padding: 2,
		borderBottomColor: 'red',
		borderBottomWidth: 2,
	},

	mainContentContainer: {
		flex: 1,
		backgroundColor: 'white',
	},

	scrollViewContainer: {
		flex: 1,
		marginBottom: 10,
	},

	logoSocialMedias: {
		width: 50,
		height: 50,
		resizeMode: 'stretch',
	},

	socialFooter: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 25,
		paddingLeft: 35,
		paddingRight: 35,
		marginTop: 10,
	},

	btnPosition: {
		flexDirection: 'row',
		justifyContent: 'center',
	},

	btnStyle: {
		backgroundColor: 'black',
	},

	btnFont: {
		color: 'white',
		fontWeight: 'bold',
	},
});

export default stylesWhite;
