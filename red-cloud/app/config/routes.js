import { StackNavigator } from 'react-navigation';

// View imports
import Tabs from './tabs';
import Login from './../views/login/login';
import PasswordRecovery from './../views/login/passwordRecovery';
import Signup from './../views/login/signup';
import ListeJeux from './../views/login/listeJeux';
import Conditions from './../views/login/conditions';
import CreateTeam from './../views/tournois/createTeam';
import PresentationEventTournoi from './../views/tournois/presentationEventTournoi';
import Code from './../views/login/code';
import NewPassword from './../views/login/newPassword';
import Exemple from './../views/exemple/exemple';

// Configuration imports
import { StatusBarPadding } from './header';

export const Routes = StackNavigator(
	{
		Login: { screen: Login },
		PasswordRecovery: { screen: PasswordRecovery },
		Signup: { screen: Signup },
		ListeJeux: { screen: ListeJeux },
		Conditions: { screen: Conditions },
		CreateTeam: { screen: CreateTeam },
		Code: { screen: Code },
		NewPassword: { screen: NewPassword },
		PresentationEventTournoi: { screen: PresentationEventTournoi },
		Tabs: { screen: Tabs },
		Exemple: { screen: Exemple },
	},
	{
		navigationOptions: { headerStyle: { marginTop: StatusBarPadding } },
	},
);
