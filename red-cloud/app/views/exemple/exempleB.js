import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { RkButton, RkText, RkTheme } from 'react-native-ui-kitten';
import { Hoshi } from 'react-native-textinput-effects';
import LogoHeader from './../../components/avatar/logoHeader';
import stylesBlack from './../../styles/StyleSheetB';

class exempleB extends React.Component {
	//eslint-disable-next-line
	static navigationOptions = {
		headerTitle: <LogoHeader />,
		color: 'white',
	};

	render() {
		return (
			<View style={stylesBlack.mainContentContainer}>
				<ScrollView style={stylesBlack.scrollViewContainer}>
					<Hoshi
						label={'Nom utilisateur'}
						rkType="textInputLogin"
						onChangeText={this.props.updatePseudo}
						borderColor={this.props.pseudo !== '' ? 'grey' : '#ff4444'}
						value={this.props.pseudo}
					/>
					<Hoshi
						label={'Mot de passe'}
						rkType="textInputLogin"
						onChangeText={this.props.updatePassword}
						//borderColor={checkPassword(this.props.password) ? 'grey' : '#ff4444'}
						value={this.props.password}
						secureTextEntry
					/>
					<View style={stylesBlack.btnPosition}>
						<RkButton
							rkType="social"
							style={stylesBlack.btnStyle}
							onPress={() => {
								this.checkLogin();
							}}
						>
							<RkText rkType="awesome hero accentColor" style={stylesBlack.btnFont}>
								Se Connecter
							</RkText>
						</RkButton>
					</View>
					<RkText
						rkType="primary3"
						style={{
							color: 'white',
							marginTop: 20,
							marginLeft: 50,
						}}
					>
						Pas encore de compte?{' '}
					</RkText>
					<RkButton
						rkType="clear"
						style={{
							marginTop: -20,
							marginLeft: 160,
						}}
						onPress={() => {
							this.props.navigation.navigate('Signup');
						}}
						title="Signup"
					>
						<RkText rktype="header6" style={stylesBlack.linkText}>
							Inscris toi!
						</RkText>
					</RkButton>
					<RkButton
						rkType="clear"
						style={{ marginTop: 20 }}
						onPress={() => {
							this.props.navigation.navigate('PasswordRecovery');
						}}
					>
						<RkText rkType="header6" style={stylesBlack.linkText}>
							Mot de passe oublié ?
						</RkText>
					</RkButton>
				</ScrollView>
			</View>
		);
	}
}

export default exempleB;
