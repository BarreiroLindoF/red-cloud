export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const UPDATE_CONDITIONS = 'UPDATE_CONDITIONS';

export function updateUsername(payload) {
	return {
		type: UPDATE_USERNAME,
		payload,
	};
}

export function updateConditions(payload) {
	return {
		type: UPDATE_CONDITIONS,
		payload,
	};
}
