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

// Configuration imports
import { StatusBarPadding } from './header';

export const Routes = StackNavigator(
	{
		Login: { screen: Login },
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
		Inscription: { screen: Inscription },
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
