import * as Views from './../views/index'
import { StackNavigator } from 'react-navigation'

export const Routes = StackNavigator({
	Login: { screen: Views.LoginRC },
	PasswordRecovery: { screen: Views.PasswordRecovery },
	Exemple: { screen: Views.Exemple },
})
