import { StackNavigator } from 'react-navigation';

// View imports
import Tabs from './tabs';
import Login from './../views/login/login';
import Signup from './../views/login/signup';
import ListeJeux from './../views/login/listeJeux';
import Conditions from './../views/login/conditions';
import Inscription from './../views/tournois/inscription';
import CreateTeam from './../views/tournois/createTeam';
import PresentationEventTournoi from './../views/tournois/presentationEventTournoi';
import MesInscriptions from './../views/tournois/mesInscriptions';

// Configuration imports
import { StatusBarPadding } from './header';

export const Routes = StackNavigator(
	{
		Login: { screen: Login },
		Tabs: { screen: Tabs },
		Conditions: { screen: Conditions },
		Inscription: { screen: Inscription },
		MesInscriptions: { screen: MesInscriptions },
		ListeJeux: { screen: ListeJeux },
		Signup: { screen: Signup },
		CreateTeam: { screen: CreateTeam },
		PresentationEventTournoi: { screen: PresentationEventTournoi },
	},
	{
		navigationOptions: {
			headerStyle: {
				//marginTop: StatusBarPadding,
				backgroundColor: 'black',
			},
		},
	},
);
