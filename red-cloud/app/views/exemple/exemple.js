import React from 'react';
import { RkText } from 'react-native-ui-kitten';
import { Text, View } from 'react-native';
import LogoHeader from './../../components/avatar/logoHeader';
import stylesWhite from './../../styles/StyleSheetW';

class Exemple extends React.Component {
	//eslint-disable-next-line
	static navigationOptions = {
		headerTitle: <LogoHeader />,
		color: 'white',
	};

	render() {
		return (
			<View>
				<View style={stylesWhite.redStrip}>
					<RkText rkType="hero" style={stylesWhite.title}>
						Exemple
					</RkText>
				</View>
				<View>
					<Text> CONTENT </Text>
				</View>
			</View>
		);
	}
}

export default Exemple;
