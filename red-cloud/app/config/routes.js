import { StackNavigator } from 'react-navigation';
import * as Views from './../views/index';
import { StatusBarPadding } from './header';

export const Routes = StackNavigator(
	{
		Login: { screen: Views.Login },
		PasswordRecovery: { screen: Views.PasswordRecovery },
		Exemple: { screen: Views.Exemple },
		Tournois: { screen: Views.Tournois },
		Signup: { screen: Views.Signup },
		ListeJeux: { screen: Views.ListeJeux },
		Conditions: { screen: Views.Conditions },
	},
	{
		navigationOptions: { headerStyle: { marginTop: StatusBarPadding } },
	},
);
