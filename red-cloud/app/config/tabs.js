// Navigation imports
import { TabNavigator } from 'react-navigation';
import { NavigationComponent } from 'react-native-material-bottom-navigation';

// View imports
import Tournois from './../views/tournois/tournois';
import Contact from './../views/contact/contact';
import Params from './../views/parametres/params';
import Menu from './../views/menu/menu';

// Configuration imports
import { StatusBarPadding } from './header';

export default TabNavigator(
	{
		Évènements: {
			screen: Tournois,
		},
		Menu: {
			screen: Menu,
		},
		Contact: {
			screen: Contact,
		},
		Params: {
			screen: Params,
		},
	},
	{
		navigationOptions: { headerStyle: { marginTop: StatusBarPadding } },
		backBehavior: 'initialRoute',
		lazy: false,
		swipeEnabled: false,
		tabBarComponent: NavigationComponent,
		tabBarPosition: 'bottom',
		tabBarOptions: {
			bottomNavigationOptions: {
				shifting: true,
				labelColor: 'white',
				backgroundColor: 'black',
				//rippleColor: 'rgba(255,255,255,1)',
			},
		},
	},
);
