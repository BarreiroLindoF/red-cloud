export const UPDATE_NOM = 'UPDATE_NOM';
export const UPDATE_PRENOM = 'UPDATE_PRENOM';
export const UPDATE_PSEUDO = 'UPDATE_PSEUDO';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_NPA = 'UPDATE_NPA';
export const UPDATE_VILLE = 'UPDATE_VILLE';
export const UPDATE_DATE_NAISSANCE = 'UPDATE_DATE_NAISSANCE';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const UPDATE_CONDITIONS = 'UPDATE_CONDITIONS';

export function updateNom(payload) {
	return {
		type: UPDATE_NOM,
		payload,
	};
}

export function updatePrenom(payload) {
	return {
		type: UPDATE_PRENOM,
		payload,
	};
}

export function updatePseudo(payload) {
	return {
		type: UPDATE_PSEUDO,
		payload,
	};
}

export function updateEmail(payload) {
	return {
		type: UPDATE_EMAIL,
		payload,
	};
}

export function updateNPA(payload) {
	return {
		type: UPDATE_NPA,
		payload,
	};
}

export function updateVille(payload) {
	return {
		type: UPDATE_VILLE,
		payload,
	};
}

export function updateDateNaissance(payload) {
	return {
		type: UPDATE_DATE_NAISSANCE,
		payload,
	};
}

export function updatePassword(payload) {
	return {
		type: UPDATE_PASSWORD,
		payload,
	};
}

export function updateToken(payload) {
	return {
		type: UPDATE_TOKEN,
		payload,
	};
}

export function updateConditions(payload) {
	return {
		type: UPDATE_CONDITIONS,
		payload,
	};
}