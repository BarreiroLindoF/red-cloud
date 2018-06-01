import { Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';

// View imports
import Tabs from './tabs';
import Login from './../views/login/login';
import Signup from './../views/login/signup';
import ListeJeux from './../views/login/listeJeux';
import Conditions from './../views/login/conditions';
import Inscription from './../views/tournois/inscription';
import PresentationEventTournoi from './../views/tournois/presentationEventTournoi';
import MesInscriptions from './../views/tournois/mesInscriptions';

const navigationOptions = () => {
	if (Platform.OS === 'ios') {
		return {
			navigationOptions: {
				headerStyle: {
					backgroundColor: 'black',
				},
				headerTintColor: 'red',
			},
		};
	}
	return {
		navigationOptions: {
			headerLeft: null,
			headerStyle: {
				backgroundColor: 'black',
			},
		},
	};
};

export const Routes = StackNavigator(
	{
		Login: { screen: Login },
		Tabs: { screen: Tabs },
		ListeJeux: { screen: ListeJeux },
		MesInscriptions: { screen: MesInscriptions },
		Conditions: { screen: Conditions },
		Inscription: { screen: Inscription },
		Signup: { screen: Signup },
		PresentationEventTournoi: { screen: PresentationEventTournoi },
	},
	navigationOptions(),
);
