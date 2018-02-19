import { NativeModules } from 'react-native';
import url from 'url';

export const root = `http://${url.parse(NativeModules.SourceCode.scriptURL).hostname}:80`;

export const URL = {
	posts: '/api/entrypoint.php?events',
	login: '/api/entrypoint.php',
};
