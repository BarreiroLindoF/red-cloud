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
	},
	{
		navigationOptions: { headerStyle: { marginTop: StatusBarPadding } },
	},
);
