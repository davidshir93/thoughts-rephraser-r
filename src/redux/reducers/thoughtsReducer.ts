import { ActionTypes } from '../consts/action-types';
import { IThought, IState } from '../../interfaces';

interface SetThoughtsAction {
	type: ActionTypes.SET_THOUGHTS;
	payload: IThought[];
}

interface AddThoughtAction {
	type: ActionTypes.ADD_THOUGHT;
	payload: IThought;
}

interface DeleteThoughtAction {
	type: ActionTypes.DELETE_THOUGHT;
	payload: string;
}

interface SetCurrentThoughtAction {
	type: ActionTypes.SET_CURRENT_THOUGHT;
	payload: string;
}

interface EditThoughtAction {
	type: ActionTypes.EDIT_THOUGHT;
	payload: IThought;
}

const initState: IState = {
	thoughts: [
		{
			id: '1',
			original: 'I’m a total mess and I can’t focus at all, I’ll never succeed',
			rephrased:
				'I’m having a hard time focusing right now, but I’ve had and will have different experiences',
			distortions: [
				'blackAndWhiteThinking',
				'catastrophizing',
				'overgeneralizing',
			],
			createdBy: 'davidshir',
			firstName: 'David',
			lastName: 'Shir',
		},
		{
			id: '2',
			original:
				'I don’t know how to handle social situations and I doomed to be alone',
			rephrased:
				'I’m having a difficult time with some of my social interactions, but not all of them are bad',
			distortions: [
				'blackAndWhiteThinking',
				'catastrophizing',
				'overgeneralizing',
			],
			createdBy: 'davidshir',
			firstName: 'David',
			lastName: 'Shir',
		},
	],
	currentThought: '',
};

export const thoughtsReducer = (
	state: IState = initState,
	action:
		| SetThoughtsAction
		| AddThoughtAction
		| DeleteThoughtAction
		| SetCurrentThoughtAction
		| EditThoughtAction
) => {
	switch (action.type) {
		case ActionTypes.SET_THOUGHTS:
			return { ...state, thoughts: [...state.thoughts, ...action.payload] };

		case ActionTypes.ADD_THOUGHT:
			return { ...state, thoughts: [...state.thoughts, action.payload] };

		case ActionTypes.DELETE_THOUGHT:
			return {
				...state,
				thoughts: state.thoughts.filter(
					(thought) => thought.id !== action.payload
				),
			};

		case ActionTypes.SET_CURRENT_THOUGHT:
			return { ...state, currentThought: action.payload };

		case ActionTypes.EDIT_THOUGHT:
			return {
				...state,
				thoughts: state.thoughts.map((thought) => {
					if (thought.id === action.payload.id) {
						return action.payload;
					} else {
						return thought;
					}
				}),
			};

		default:
			return state;
	}
};
