import { SIGN_OUT_TYPE, SIGN_IN_TYPE } from '../actions/types';

const INITIAL_STATE = {
	isSignedIn: null,
	userid: null,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGN_IN_TYPE:
			return { ...state, isSignedIn: true, userid: action.payload };
		case SIGN_OUT_TYPE:
			return { ...state, isSignedIn: false, userid: null };
		default:
			return state;
	}
};
