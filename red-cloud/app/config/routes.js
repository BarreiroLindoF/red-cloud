import { Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';

// View imports
import Tabs from './tabs';
import Login from './../views/login/login';
import PasswordRecovery from './../views/login/passwordRecovery';
import Signup from './../views/login/signup';
import NewPassword from './../views/login/newPassword';
import ListeJeux from './../views/login/listeJeux';
import Conditions from './../views/login/conditions';
import Inscription from './../views/tournois/inscription';
import CreateTeam from './../views/tournois/createTeam';
import PresentationEventTournoi from './../views/tournois/presentationEventTournoi';
import MesInscriptions from './../views/tournois/mesInscriptions';
import Code from './../views/login/code';

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
		Inscription: { screen: Inscription },
		MesInscriptions: { screen: MesInscriptions },
		ListeJeux: { screen: ListeJeux },
		Signup: { screen: Signup },
		PasswordRecovery: { screen: PasswordRecovery },
		Tabs: { screen: Tabs },
		Conditions: { screen: Conditions },
		CreateTeam: { screen: CreateTeam },
		Code: { screen: Code },
		NewPassword: { screen: NewPassword },
		PresentationEventTournoi: { screen: PresentationEventTournoi },
	},
	navigationOptions(),
);
