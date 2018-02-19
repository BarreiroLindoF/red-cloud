import { root, URL } from './constants';

const buildURL = (url) => {
	return root + url;
};

export const getAllPosts = () => {
	const uri = buildURL(URL.posts);
	return fetch(uri) //eslint-disable-line
		.then((response) => {
			return response.json();
		})
		.then((responseJson) => {
			return responseJson;
		})
		.catch((error) => {
			console.error(error);
		});
};

export const login = (pseudo, password) => {
	const uri = buildURL(URL.login);

	const formdata = new FormData();
	formdata.append('login', '');
	formdata.append('pseudo', pseudo);
	formdata.append('password', password);

	return fetch(uri, {
		method: 'post',
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		body: formdata,
	})
		.then((response) => {
			return response.json();
		})
		.then((responseJson) => {
			return responseJson;
		})
		.catch((error) => {
			console.error(error);
		});
};
