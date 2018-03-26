import React from 'react';
import { RkText } from 'react-native-ui-kitten';
import { Text, View } from 'react-native';
import LogoHeader from './../../components/avatar/logoHeader';
import stylesBlack from './../../assets/styles/StyleSheetB';

class exempleB extends React.Component {
	//eslint-disable-next-line
	static navigationOptions = {
		headerTitle: <LogoHeader />,
		color: 'white',
	};

	render() {
		return (
			<View>
				<View>
					<RkText rkType="hero">Exemple</RkText>
				</View>
				<View>
					<Text> CONTENT </Text>
				</View>
			</View>
		);
	}
}

export default exempleB;
