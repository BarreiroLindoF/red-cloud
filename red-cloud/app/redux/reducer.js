import * as Actions from './actions';

const initialState = {
	nom: '',
	prenom: '',
	pseudo: '',
	email: '',
	npa: '',
	ville: '',
	datenaissance: '',
	password: '',
	token: '',
	conditions: false,
};

const updateUser = (state = initialState, action) => {
	switch (action.type) {
		case Actions.UPDATE_NOM:
			return { ...state, nom: action.payload };
		case Actions.UPDATE_CONDITIONS:
			return { ...state, conditions: action.payload };
		default:
			return state;
	}
	//return { ...state };
};

export default updateUser;
