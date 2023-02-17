import { AuthActionTypes } from '../consts/action-types';

export const logIn = (details: Object) => {
	return {
		type: AuthActionTypes.LOG_IN,
		payload: details,
	};
};

export const signUp = (details: Object) => {
	return {
		type: AuthActionTypes.SIGN_UP,
		payload: details,
	};
};

export const logOut = () => {
	return {
		type: AuthActionTypes.LOG_OUT,
	};
};
