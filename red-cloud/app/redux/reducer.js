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
		case Actions.RESET:
			return { initialState };
		case Actions.UPDATE_NOM:
			return { ...state, nom: action.payload };
		case Actions.UPDATE_PRENOM:
			return { ...state, prenom: action.payload };
		case Actions.UPDATE_PSEUDO:
			return { ...state, pseudo: action.payload };
		case Actions.UPDATE_EMAIL:
			return { ...state, email: action.payload };
		case Actions.UPDATE_NPA:
			return { ...state, npa: action.payload };
		case Actions.UPDATE_VILLE:
			return { ...state, ville: action.payload };
		case Actions.UPDATE_DATE_NAISSANCE:
			return { ...state, datenaissance: action.payload };
		case Actions.UPDATE_PASSWORD:
			return { ...state, password: action.payload };
		case Actions.UPDATE_TOKEN:
			return { ...state, token: action.payload };
		case Actions.UPDATE_CONDITIONS:
			return { ...state, conditions: action.payload };
		default:
			return state;
	}
	//return { ...state };
};

export default updateUser;
