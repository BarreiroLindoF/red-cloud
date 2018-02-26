import { root, URL } from './constants';

const buildURL = (url) => {
	return root + url;
};

export const getAllPosts = (token) => {
	const uri = buildURL(URL.posts);
	return fetch(uri, {
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + token,
		},
	}) //eslint-disable-line
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
	//formdata.append('login', '');
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

export const password = (user) => {
	const uri = buildURL(URL.passwordRecovery);
	const formdata = new FormData();
	formdata.append('user', user);
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

export const token = (email, code) => {
	const uri = buildURL(URL.token);
	const formdata = new FormData();
	formdata.append('email', email);
	formdata.append('code', code);
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
