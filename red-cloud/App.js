import React from 'react'
import { View, ScrollView, Keyboard, KeyboardAvoidingView } from 'react-native'
import { RkButton, RkText, RkTextInput, RkStyleSheet, RkTheme, RkAvoidKeyboard } from 'react-native-ui-kitten'

export default class App extends React.Component {
	render() {
		return (
			<KeyboardAvoidingView style={styles.screen} behavior="padding">
				<View style={styles.contentContainer}>
					<ScrollView keyboardShouldPersistTaps="always">
						<RkTextInput rkType="success" placeholder="Nom" />
						<RkTextInput rkType="success" placeholder="Prénom" />
						<RkTextInput rkType="success" placeholder="Pseudo" />
						<RkTextInput rkType="success" placeholder="Ville" />
						<RkTextInput rkType="success" placeholder="NPA" />
						<RkTextInput rkType="success" placeholder="Date de naissance" />
						<RkTextInput rkType="success" placeholder="Email" />
						<RkTextInput rkType="success" placeholder="Password" secureTextEntry={true} />
						<RkTextInput
							style={styles.font}
							rkType="success"
							placeholder="Confirm Password"
							secureTextEntry={true}
						/>
					</ScrollView>
				</View>
				<View style={styles.save}>
					<RkButton style={{ backgroundColor: 'green' }} rkType="rounded">
						{' '}
						Suivant{' '}
					</RkButton>
				</View>
				<View style={styles.footer}>
					<View style={styles.textRow}>
						<RkText style={{ color: 'white' }} rkType="primary3">
							Vous avez déjà un compte ?
						</RkText>
						<RkButton rkType="clear">
							<RkText style={{ color: 'white' }}> Connectez-vous ici </RkText>
						</RkButton>
					</View>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

RkTheme.setType('RkTextInput', 'success', {
	labelColor: 'grey',
	underlineColor: 'grey',
	underlineWidth: 2,
	placeholderTextColor: 'grey',
	color: 'white',
})

let styles = RkStyleSheet.create((theme) => ({
	screen: {
		padding: 10,
		flex: 1,
		justifyContent: 'space-around',
		backgroundColor: 'black',
	},
	content: {
		justifyContent: 'space-between',
	},
	save: {
		marginTop: 25,
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	footer: {
		justifyContent: 'flex-end',
		marginBottom: 5,
	},
	textRow: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	contentContainer: {
		flex: 1,
	},
	font: {
		color: 'white',
	},
}))
