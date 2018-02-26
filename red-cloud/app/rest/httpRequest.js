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

export const register = (nom, prenom, pseudo, email, npa, ville, datenaissance, password) => {
	const uri = buildURL(URL.register);

	const formdata = new FormData();
	formdata.append('nom', nom);
	formdata.append('prenom', prenom);
	formdata.append('pseudo', pseudo);
	formdata.append('email', email);
	formdata.append('npa', npa);
	formdata.append('ville', ville);
	formdata.append('datenaissance', datenaissance);
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

export const selectUser = (user) => {
	const uri = buildURL(URL.selectUser);

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
			console.log(error);
			return {
				message: 'Erreur de parsing de la réponse en objet json',
				payload: 'Conflit avec une contrainte dans la bdd, mail ou pseudo déjà existant !',
				success: false,
			};
		});
};
