import { TabNavigator } from 'react-navigation';
import { NavigationComponent } from 'react-native-material-bottom-navigation';

// View imports
import Tournois from './../views/tournois/tournois';
import Menu from './../views/exemple/menu';
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
		tabBarComponent: NavigationComponent,
		tabBarPosition: 'bottom',
		tabBarOptions: {
			bottomNavigationOptions: {
				labelColor: 'white',
				backgroundColor: 'red',
				rippleColor: 'white',
				tabs: {
					Events: {
						barBackgroundColor: '#37474F',
						labelColor: 'black',
					},
					Menu: {
						barBackgroundColor: '#37474F',
						labelColor: 'black',
					},
					Contact: {
						barBackgroundColor: '#37474F',
						labelColor: 'black',
					},
					Params: {
						barBackgroundColor: '#37474F',
						labelColor: 'black',
					},
				},
			},
		},
	},
);
