import { Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';

// View imports
import Tabs from './tabs';
import Login from './../views/login/login';
import Signup from './../views/login/signup';
import ListeJeux from './../views/login/listeJeux';
import Conditions from './../views/login/conditions';
import Inscription from './../views/tournois/inscription';
import CreateTeam from './../views/tournois/createTeam';
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
		Tabs: { screen: Tabs },
		Login: { screen: Login },
		ListeJeux: { screen: ListeJeux },
		MesInscriptions: { screen: MesInscriptions },
		Conditions: { screen: Conditions },
		Inscription: { screen: Inscription },
		Signup: { screen: Signup },
		CreateTeam: { screen: CreateTeam },
		PresentationEventTournoi: { screen: PresentationEventTournoi },
	},
	navigationOptions(),
);
