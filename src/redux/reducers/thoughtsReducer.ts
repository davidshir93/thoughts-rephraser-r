import { ThoughtsActionTypes } from '../consts/action-types';
import { IThought, IThoughtsState } from '../../interfaces';

interface SetThoughtsAction {
	type: ThoughtsActionTypes.SET_THOUGHTS;
	payload: IThought[];
}

interface AddThoughtAction {
	type: ThoughtsActionTypes.ADD_THOUGHT;
	payload: IThought;
}

interface DeleteThoughtAction {
	type: ThoughtsActionTypes.DELETE_THOUGHT;
	payload: string;
}

interface SetCurrentThoughtAction {
	type: ThoughtsActionTypes.SET_CURRENT_THOUGHT;
	payload: string;
}

interface EditThoughtAction {
	type: ThoughtsActionTypes.EDIT_THOUGHT;
	payload: IThought;
}

const initState: IThoughtsState = {
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
	state: IThoughtsState = initState,
	action:
		| SetThoughtsAction
		| AddThoughtAction
		| DeleteThoughtAction
		| SetCurrentThoughtAction
		| EditThoughtAction
) => {
	switch (action.type) {
		case ThoughtsActionTypes.SET_THOUGHTS:
			return { ...state, thoughts: [...state.thoughts, ...action.payload] };

		case ThoughtsActionTypes.ADD_THOUGHT:
			console.log('adding thoguht', action.payload);
			return { ...state, thoughts: [...state.thoughts, action.payload] };

		case ThoughtsActionTypes.DELETE_THOUGHT:
			return {
				...state,
				thoughts: state.thoughts.filter(
					(thought) => thought.id !== action.payload
				),
			};

		case ThoughtsActionTypes.SET_CURRENT_THOUGHT:
			return { ...state, currentThought: action.payload };

		case ThoughtsActionTypes.EDIT_THOUGHT:
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
