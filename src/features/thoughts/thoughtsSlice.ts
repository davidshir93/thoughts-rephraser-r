import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IThought, IThoughtsState } from '../../interfaces';

const initialState: IThoughtsState = {
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
	currentThoughtId: '',
};

const thoughtsSlice = createSlice({
	name: 'thoughts',
	initialState,
	reducers: {
		setThoughts: (state, action: PayloadAction<IThought[]>) => {
			state.thoughts = action.payload;
		},
		addThought: (state, action: PayloadAction<IThought>) => {
			state.thoughts.push(action.payload);
		},
		deleteThought: (state, action: PayloadAction<string>) => {
			state.thoughts = state.thoughts.filter(
				(thought) => thought.id !== action.payload
			);
		},
		setCurrentThought: (state, action: PayloadAction<string>) => {
			state.currentThoughtId = action.payload;
		},
		editThought: (state, action: PayloadAction<IThought>) => {
			state.thoughts = state.thoughts.map((thought) => {
				if (thought.id === action.payload.id) {
					return action.payload;
				}
				return thought;
			});
		},
	},
});

export default thoughtsSlice.reducer;
export const {
	setThoughts,
	addThought,
	setCurrentThought,
	deleteThought,
	editThought,
} = thoughtsSlice.actions;
