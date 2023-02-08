import { ActionTypes } from '../consts/action-types';
import { IThought } from '../../interfaces';

export const setThoughts = (thoughts: IThought[]) => {
	return {
		type: ActionTypes.SET_THOUGHTS,
		payload: thoughts,
	};
};
