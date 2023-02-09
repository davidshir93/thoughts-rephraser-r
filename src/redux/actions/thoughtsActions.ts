import { ActionTypes } from '../consts/action-types';
import { IThought } from '../../interfaces';

export const setThoughts = (thoughts: IThought[]) => {
	return {
		type: ActionTypes.SET_THOUGHTS,
		payload: thoughts,
	};
};

export const addThought = (thought: IThought) => {
	return {
		type: ActionTypes.ADD_THOUGHT,
		payload: thought,
	};
};

export const deleteThought = (id: string) => {
	return {
		type: ActionTypes.DELETE_THOUGHT,
		payload: id,
	};
};

export const setCurrentThought = (id: string) => {
	return {
		type: ActionTypes.SET_CURRENT_THOUGHT,
		payload: id,
	};
};

export const editThought = (thought: IThought) => {
	return {
		type: ActionTypes.EDIT_THOUGHT,
		payload: thought,
	};
};
