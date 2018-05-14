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
			//Authorization: `Bearer ${getToken()}`,
			Authorization:
				'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTUyNjI4OTYxMCwiZXhwIjoxNTI2MjkzMjEwLCJuYmYiOjE1MjYyODk2MTAsImp0aSI6IlJvVmdhQm9LNnNlM0pwNWgiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEiLCJ1c2VyIjp7ImlkIjoxfX0.6aT1CMAnn9dQR4p1L6JPXu8kBrZhAHyfMtnaUrexfnQ',
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
	participants: '/api/tournois/{$id}/participants',
	menu: '/api/menu',
	jeux: 'api/jeux',
	updateJeux: 'api/me/jeux',
	categoriesJeux: 'api/jeux/categories',
	inscriptions: 'api/me/inscriptions',
};
