import React from 'react';
import { Provider } from 'react-redux';
import { Routes } from './app/config/routes';
import store from './app/redux/store';

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Routes />
			</Provider>
		);
	}
}
