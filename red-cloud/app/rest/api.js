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
				'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTUyNzUyNDgzNSwibmJmIjoxNTI3NTI0ODM1LCJqdGkiOiIzNWVIdlljZVNrYTN4Y2p0Iiwic3ViIjoxLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIiwidXNlciI6eyJpZCI6MX19.bg1-PCrFXebaY0uvRlFl0gSPsFn2oOJ8J8i3S8LA7zI',
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
	offres: '/api/offres',
	jeux: 'api/jeux',
	updateJeux: 'api/me/jeux',
	categoriesJeux: 'api/jeux/categories',
	inscriptions: 'api/me/inscriptions',
	cancelInscriptions: 'api/me/participation/tournoi/{$id}',
	deconnexion: 'api/me/deconnexion',
	notificationOffre: 'api/me/offres/notification',
	modifierUtilisateur: 'api/me/update',
	modifyPassword: 'api/me/password',
};
