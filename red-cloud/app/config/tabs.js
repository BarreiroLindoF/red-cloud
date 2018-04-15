import { TabNavigator } from 'react-navigation';
import { NavigationComponent } from 'react-native-material-bottom-navigation';

// View imports
import Tournois from './../views/tournois/tournois';
import Menu from './../views/menu/menu';
import Contact from './../views/exemple/contact';
import Params from './../views/exemple/params';

// Configuration imports
import { StatusBarPadding } from './header';

export default TabNavigator(
	{
		Events: {
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
		backBehavior: 'none',
		lazy: true,
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
