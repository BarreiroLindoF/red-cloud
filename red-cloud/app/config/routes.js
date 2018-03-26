import { StackNavigator } from 'react-navigation';
import Login from './../views/login/login';
import PasswordRecovery from './../views/login/passwordRecovery';
import Signup from './../views/login/signup';
import ListeJeux from './../views/login/listeJeux';
import Conditions from './../views/login/conditions';
import Exemple from './../views/exemple/exemple';
import Tournois from './../views/tournois/tournois';
import Inscription from './../views/tournois/inscription';
import CreateTeam from './../views/tournois/createTeam';
import PresentationEventTournoi from './../views/tournois/presentationEventTournoi';
import Code from './../views/login/code';
import NewPassword from './../views/login/newPassword';
import { StatusBarPadding } from './header';

export const Routes = StackNavigator(
	{
		Login: { screen: Login },
		PasswordRecovery: { screen: PasswordRecovery },
		Exemple: { screen: Exemple },
		Tournois: { screen: Tournois },
		Signup: { screen: Signup },
		ListeJeux: { screen: ListeJeux },
		Conditions: { screen: Conditions },
		CreateTeam: { screen: CreateTeam },
		Code: { screen: Code },
		NewPassword: { screen: NewPassword },
		PresentationEventTournoi: { screen: PresentationEventTournoi },
		Inscription: { screen: Inscription },
	},
	{
		navigationOptions: { headerStyle: { marginTop: StatusBarPadding } },
	},
);
