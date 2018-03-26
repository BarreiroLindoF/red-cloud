import { StackNavigator } from 'react-navigation';
import Login from './../views/login/login';
import PasswordRecovery from './../views/login/passwordRecovery';
import Signup from './../views/login/signup';
import ListeJeux from './../views/login/listeJeux';
import Conditions from './../views/login/conditions';
import Exemple from './../views/exemple/exemple';
import Tournois from './../views/tournois/tournois';
import CreateTeam from './../views/tournois/createTeam';
import PresentationTournoi from './../views/tournois/presentationTournoi';
import Code from './../views/login/code';
import NewPassword from './../views/login/newPassword';
import { StatusBarPadding } from './header';

export const Routes = StackNavigator(
	{
		Login: { screen: Login },
		Tournois: { screen: Tournois },
		PresentationTournoi: { screen: PresentationTournoi },
		PasswordRecovery: { screen: PasswordRecovery },
		Signup: { screen: Signup },
		ListeJeux: { screen: ListeJeux },
		Conditions: { screen: Conditions },
		CreateTeam: { screen: CreateTeam },
		Code: { screen: Code },
		NewPassword: { screen: NewPassword },
		Exemple: { screen: Exemple },
	},
	{
		navigationOptions: {
			headerStyle: {
				marginTop: StatusBarPadding,
				backgroundColor: 'black',
			},
		},
	},
);
