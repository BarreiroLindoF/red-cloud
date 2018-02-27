import { StackNavigator } from 'react-navigation';
import Login from './../views/login/login';
import PasswordRecovery from './../views/login/passwordRecovery';
import Signup from './../views/login/signup';
import ListeJeux from './../views/login/listeJeux';
import Conditions from './../views/login/conditions';
import Exemple from './../views/exemple/exemple';
import Tournois from './../views/tournois/tournois';
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
	},
	{
		navigationOptions: { headerStyle: { marginTop: StatusBarPadding } },
	},
);
