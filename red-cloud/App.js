import React from 'react'
import { View, ScrollView, Keyboard } from 'react-native'
import { RkButton, RkText, RkTextInput, RkStyleSheet, RkTheme, RkAvoidKeyboard } from 'react-native-ui-kitten'

export default class App extends React.Component {
	render() {
		return (
			<RkAvoidKeyboard
				style={styles.screen}
				onStartShouldSetResponder={(e) => true}
				onResponderRelease={(e) => Keyboard.dismiss()}
			>
				<View>
					<RkText rkType="title">Création de ton compte</RkText>
				</View>
				<View style={styles.content}>
					<ScrollView>
						<RkTextInput rkType="success" placeholder="Nom" />
						<RkTextInput rkType="success" placeholder="Prénom" />
						<RkTextInput rkType="success" placeholder="Pseudo" />
						<RkTextInput rkType="success" placeholder="Ville" />
						<RkTextInput rkType="success" placeholder="NPA" />
						<RkTextInput rkType="success" placeholder="Date de naissance" />
						<RkTextInput rkType="success" placeholder="Email" />
						<RkTextInput rkType="success" placeholder="Password" secureTextEntry={true} />
						<RkTextInput rkType="success" placeholder="Confirm Password" secureTextEntry={true} />
						{/*<GradientButton style={styles.save} rkType='large' text='SIGN UP'/>*/}
					</ScrollView>
					<View style={styles.footer}>
						<View style={styles.textRow}>
							<RkText rkType="primary3">Vous avez déjà un compte ?</RkText>
							<RkButton rkType="clear">
								<RkText> Connectez-vous ici </RkText>
							</RkButton>
						</View>
					</View>
				</View>
			</RkAvoidKeyboard>
		)
	}
}

RkTheme.setType('RkText', 'title', {
	fontSize: 20,
	paddingTop: '100px',
})

let styles = RkStyleSheet.create((theme) => ({
	screen: {
		padding: 16,
		flex: 1,
		justifyContent: 'space-around',
		backgroundColor: theme.colors.screen.base,
	},
	content: {
		justifyContent: 'space-between',
	},
	save: {
		marginVertical: 20,
	},
	buttons: {
		flexDirection: 'row',
		marginBottom: 24,
		marginHorizontal: 24,
		justifyContent: 'space-around',
	},
	footer: {
		justifyContent: 'flex-end',
	},
	textRow: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
}))
