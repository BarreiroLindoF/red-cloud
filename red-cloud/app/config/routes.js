import { StackNavigator } from 'react-navigation';

// View imports
import Tabs from './tabs';
import Login from './../views/login/login';
import PasswordRecovery from './../views/login/passwordRecovery';
import Signup from './../views/login/signup';
import ListeJeux from './../views/login/listeJeux';
import Conditions from './../views/login/conditions';
import Inscription from './../views/tournois/inscription';
import CreateTeam from './../views/tournois/createTeam';
import PresentationEventTournoi from './../views/tournois/presentationEventTournoi';
import Code from './../views/login/code';
import NewPassword from './../views/login/newPassword';
import Exemple from './../views/exemple/exemple';
import Menu from './../views/menu/menu';

// Configuration imports
import { StatusBarPadding } from './header';

export const Routes = StackNavigator(
	{
		ListeJeux: { screen: ListeJeux },
		Login: { screen: Login },
		PasswordRecovery: { screen: PasswordRecovery },
		Signup: { screen: Signup },
		Conditions: { screen: Conditions },
		CreateTeam: { screen: CreateTeam },
		Code: { screen: Code },
		NewPassword: { screen: NewPassword },
		PresentationEventTournoi: { screen: PresentationEventTournoi },
		Inscription: { screen: Inscription },
		Tabs: { screen: Tabs },
		Exemple: { screen: Exemple },
		Menu: { screen: Menu },
	},
	{
		navigationOptions: {
			headerStyle: {
				marginTop: StatusBarPadding,
			},
		},
	},
);
