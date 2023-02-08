import { ActionTypes } from '../consts/action-types';
import { IThought, IState } from '../../interfaces';

interface SetThoughtsAction {
	type: ActionTypes.SET_THOUGHTS;
	payload: IThought[];
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
};

export const thoughtsReducer = (
	state: IState = initState,
	action: SetThoughtsAction
) => {
	switch (action.type) {
		case ActionTypes.SET_THOUGHTS:
			return { ...state, thoughts: [...state.thoughts, ...action.payload] };

		default:
			return state;
	}
};
