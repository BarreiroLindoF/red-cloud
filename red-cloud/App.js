import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Routes } from './app/config/routes';

import reducer from './app/redux/reducer';

const store = createStore(reducer);

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Routes />
			</Provider>
		);
	}
}
