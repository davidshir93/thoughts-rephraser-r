import { AuthActionTypes } from '../consts/action-types';
import { IAuthState } from '../../interfaces';

interface SignUpAction {
	type: AuthActionTypes.SIGN_UP;
	payload: Object;
}

interface LogInAction {
	type: AuthActionTypes.LOG_IN;
	payload: Object;
}

interface LogOutAction {
	type: AuthActionTypes.LOG_OUT;
}

const initState: IAuthState = {
	user: {},
};

export const authReducer = (
	state: IAuthState = initState,
	action: SignUpAction | LogInAction | LogOutAction
) => {
	switch (action.type) {
		case AuthActionTypes.SIGN_UP:
			// return { ...state, thoughts: [...state.thoughts, ...action.payload] };
			return state;

		case AuthActionTypes.LOG_IN:
			// return { ...state, thoughts: [...state.thoughts, action.payload] };
			return state;

		case AuthActionTypes.LOG_OUT:
			return { ...state, user: {} };

		default:
			return state;
	}
};
