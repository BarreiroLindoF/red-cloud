import * as Actions from './actions';

const initialState = {
	username: '',
	conditions: false,
};

const updateUser = (state = initialState, action) => {
	switch (action.type) {
		case Actions.UPDATE_USERNAME:
			return { ...state, username: action.payload };
		case Actions.UPDATE_CONDITIONS:
			return { ...state, conditions: action.payload };
		default:
			return state;
	}
	//return { ...state };
};

export default updateUser;
