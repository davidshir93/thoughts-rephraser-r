import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IThought, IThoughtsState } from '../../interfaces';

// Adding firestore imports in order to handle operations directly from the thoughts slice:
import { db } from '../../firebase';
import {
	collection,
	addDoc,
	getDocs,
	deleteDoc,
	updateDoc,
	doc,
} from 'firebase/firestore';

const initialState: IThoughtsState = {
	isLoading: true,
	error: '',
	thoughts: [],
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
		deleteThoughtSuccess: (state, action: PayloadAction<string>) => {
			state.thoughts = state.thoughts.filter(
				(thought) => thought.id !== action.payload
			);
		},
		setCurrentThought: (state, action: PayloadAction<string>) => {
			state.currentThoughtId = action.payload;
		},
		updateThoughtSuccess: (state, action: PayloadAction<IThought>) => {
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
	fetchThoughtsSuccess,
	addThoughtSuccess,
	setLoading,
	setError,
	setCurrentThought,
	deleteThoughtSuccess,
	updateThoughtSuccess,
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
		const snapshot = await getDocs(collection(db, 'thoughts'));

		const Thoughts = snapshot.docs.map(
			(doc) => ({ ...doc.data() } as IThought)
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
			// Add a new document with a generated id.
			const docRef = await addDoc(collection(db, 'thoughts'), thought);

			// Set the "id" field of the thought with the new returned id
			await updateDoc(docRef, {
				id: docRef.id,
			});

			const newThought = { ...thought, id: docRef.id };

			dispatch(addThoughtSuccess(newThought));
		} catch (error) {
			handleError(dispatch, error);
		}
	};

export const deleteThought = (id: string) => async (dispatch: any) => {
	try {
		await deleteDoc(doc(db, 'thoughts', id));
		dispatch(deleteThoughtSuccess(id));
	} catch (error) {
		handleError(dispatch, error);
	}
};

export const updateThought = (thought: IThought) => async (dispatch: any) => {
	try {
		const editedDocRef = doc(db, 'thoughts', thought.id);

		await updateDoc(editedDocRef, {
			...thought,
		});

		dispatch(updateThoughtSuccess(thought));
		dispatch(setCurrentThought(''));
	} catch (error) {
		handleError(dispatch, error);
	}
};
