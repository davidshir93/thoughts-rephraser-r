import { ThoughtsActionTypes } from '../consts/action-types';
import { IThought } from '../../interfaces';
// firebase imports
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
	onAuthStateChanged,
} from 'firebase/auth';
// import firebase from "firebase/compat/app";
import db, { auth } from '../../config/fbConfig';
import {
	collection,
	getDocs,
	deleteDoc,
	updateDoc,
	doc,
} from 'firebase/firestore';

export const setThoughts = (thoughts: IThought[]) => {
	return {
		type: ThoughtsActionTypes.SET_THOUGHTS,
		payload: thoughts,
	};
};

// Old version, returns an object before thunk installed
// export const addThought = (thought: IThought) => {
// 	return {
// 		type: ThoughtsActionTypes.ADD_THOUGHT,
// 		payload: thought,
// 	};
// };

// thunk version - returns a function
export const addThought = (thought: IThought) => {
	return async (dispatch, getState, { getFirebase, getFirestore }) => {
		// make async call to database

		try {
			// context.commit('setIsLoading', true);
			const dataBase = db.collection('thoughts').doc();
			await dataBase.set({
				thoughtId: dataBase.id,
				// createdBy: context.state.user.uid,
				...thought,
			});
			// context.commit('setIsLoading', false);
			thought.id = dataBase.id;
			// thought.createdBy = context.state.user.uid;
			// context.commit('addThought', newThoguht);

			dispatch({ type: ThoughtsActionTypes.ADD_THOUGHT, payload: thought });
		} catch (err) {
			// context.commit('setIsLoading', false);
			console.log(err.message);
			throw new Error('Could not add thought');
		}
	};
};

export const deleteThought = (id: string) => {
	return {
		type: ThoughtsActionTypes.DELETE_THOUGHT,
		payload: id,
	};
};

export const setCurrentThought = (id: string) => {
	return {
		type: ThoughtsActionTypes.SET_CURRENT_THOUGHT,
		payload: id,
	};
};

export const editThought = (thought: IThought) => {
	return {
		type: ThoughtsActionTypes.EDIT_THOUGHT,
		payload: thought,
	};
};
