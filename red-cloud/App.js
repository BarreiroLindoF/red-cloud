import React from 'react';
import { Provider } from 'react-redux';
import Expo from 'expo';
import { Routes } from './app/config/routes';
import store from './app/redux/store';

export default class App extends React.Component {
	componentDidMount() {
		// Code to execute on App startup
		Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);
	}

	render() {
		return (
			<Provider store={store}>
				<Routes />
			</Provider>
		);
	}
}
