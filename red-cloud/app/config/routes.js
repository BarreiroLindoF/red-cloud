import { StackNavigator } from 'react-navigation';
import * as Views from './../views/index';
import Login from './../views/login/login';
import ListeJeux from './../views/login/listeJeux';
import { StatusBarPadding } from './header';

export const Routes = StackNavigator(
	{
		Login: { screen: Login },
		PasswordRecovery: { screen: Views.PasswordRecovery },
		Exemple: { screen: Views.Exemple },
		Tournois: { screen: Views.Tournois },
		Signup: { screen: Views.Signup },
		ListeJeux: { screen: ListeJeux },
		Conditions: { screen: Views.Conditions },
	},
	{
		navigationOptions: { headerStyle: { marginTop: StatusBarPadding } },
	},
);
