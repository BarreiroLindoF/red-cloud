import { NativeModules } from 'react-native';
import axios from 'axios';
import url from 'url';
import store from './../redux/store';

const root = `http://${url.parse(NativeModules.SourceCode.scriptURL).hostname}:8000`;

const getToken = () => {
	return store.getState().token;
};

export const api = () => {
	return new axios.create({
		baseURL: root,
		timeout: 5000,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getToken()}`,
		},
	});
};

export const URL = {
	posts: '/api/events',
	login: '/api/auth/login',
	register: '/api/auth/register',
	selectUser: '/api/check',
	passwordRecovery: '/api/auth/forgot',
	code: '/api/auth/code',
	reset: '/api/auth/reset',
	tournaments: '/api/events/{$id}/tournaments',
	teamCheck: '/api/tournaments/{$id}/team',
	inscription: '/api/me/participation/tournoi/{$id}',
	rules: '/api/tournaments/{$id}/rules',
	menu: '/api/menu',
};
