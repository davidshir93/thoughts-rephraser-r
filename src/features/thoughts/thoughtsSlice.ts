import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IThought, IThoughtsState } from '../../interfaces';

// Adding firestore imports in order to handle operations directly from the thoughts slice:
import { db } from '../../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const initialState: IThoughtsState = {
	isLoading: false,
	error: '',
	thoughts: [
		// {
		// 	id: '1',
		// 	original: 'I’m a total mess and I can’t focus at all, I’ll never succeed',
		// 	rephrased:
		// 		'I’m having a hard time focusing right now, but I’ve had and will have different experiences',
		// 	distortions: [
		// 		'blackAndWhiteThinking',
		// 		'catastrophizing',
		// 		'overgeneralizing',
		// 	],
		// 	createdBy: 'davidshir',
		// 	firstName: 'David',
		// 	lastName: 'Shir',
		// },
		// {
		// 	id: '2',
		// 	original:
		// 		'I don’t know how to handle social situations and I doomed to be alone',
		// 	rephrased:
		// 		'I’m having a difficult time with some of my social interactions, but not all of them are bad',
		// 	distortions: [
		// 		'blackAndWhiteThinking',
		// 		'catastrophizing',
		// 		'overgeneralizing',
		// 	],
		// 	createdBy: 'davidshir',
		// 	firstName: 'David',
		// 	lastName: 'Shir',
		// },
	],
	currentThoughtId: '',
};

const thoughtsSlice = createSlice({
	name: 'thoughts',
	initialState,
	reducers: {
		//	Cannot directly set thoughts
		setThoughts: (state, action: PayloadAction<IThought[]>) => {
			state.thoughts = action.payload;
		},
		fetchThoughtsSuccess: (state, action: PayloadAction<IThought[]>) => {
			state.thoughts = action.payload;
		},
		addThoughtSuccess: (state, action: PayloadAction<IThought>) => {
			state.thoughts.unshift(action.payload);
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
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
	// setThoughts,
	fetchThoughtsSuccess,
	addThoughtSuccess,
	setLoading,
	setError,
	setCurrentThought,
	deleteThought,
	editThought,
} = thoughtsSlice.actions;

export const handleError = (dispatch: any, error: any) => {
	if (error instanceof Error) {
		dispatch(setError(error.message));
	} else {
		dispatch(setError(`'Unexpected error ${error}`));
	}
};
export const fetchThoughts = () => async (dispatch: any) => {
	dispatch(setLoading(true));
	try {
		// const snapshot = await db.collection('Thoughts').get();
		const snapshot = await getDocs(collection(db, 'thoughts'));

		const Thoughts = snapshot.docs.map(
			(doc) => ({ id: doc.id, ...doc.data() } as IThought)
		);
		dispatch(fetchThoughtsSuccess(Thoughts));
	} catch (error) {
		handleError(dispatch, error);
	}
	dispatch(setLoading(false));
};

export const addThought =
	(thought: Omit<IThought, 'id'>) => async (dispatch: any) => {
		try {
			const timestamp = new Date();
			// Add a new document with a generated id.
			const docRef = await addDoc(collection(db, 'thoughts'), {
				...thought,
				createdAt: timestamp,
			});
			console.log('Document written with ID: ', docRef.id);
			const newThought = { id: docRef.id, ...thought };
			dispatch(addThoughtSuccess(newThought));
		} catch (error) {
			handleError(dispatch, error);
		}
	};
