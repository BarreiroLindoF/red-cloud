import { NativeModules } from 'react-native';
import url from 'url';

export const root = `http://${url.parse(NativeModules.SourceCode.scriptURL).hostname}:8000`;

export const URL = {
	posts: '/api/events',
	login: '/api/auth/login',
	register: '/api/auth/register',
	selectUser: '/api/check',
};
