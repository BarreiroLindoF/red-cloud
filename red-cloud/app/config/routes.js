import * as Views from './../views/index'
import { StackNavigator } from 'react-navigation'

export const Routes = StackNavigator({
	Login: { screen: Views.Login },
	Exemple: { screen: Views.Exemple },
	Signup: { screen: Views.Signup },
})
