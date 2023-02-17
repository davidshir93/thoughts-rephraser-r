import { combineReducers } from 'redux';
import { thoughtsReducer } from './thoughtsReducer';
import { authReducer } from './authReducer';

export const reducers = combineReducers({
	thoughtsReducer,
	authReducer,
});
