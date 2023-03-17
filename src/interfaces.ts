import firebase from 'firebase/app';
import { DISTORTIONS_TYPE } from './const';

export interface IThought {
	id: string;
	original: string;
	rephrased: string;
	distortions: (keyof DISTORTIONS_TYPE)[];
	createdBy: string;
	firstName: string;
	lastName: string;
	createdAt: Date;
}

export interface IThoughtsState {
	isLoading: boolean;
	error: string;
	thoughts: IThought[];
	currentThoughtId: string;
}

export interface IUserState {
	user: IUser | null;
	loading: boolean;
}

export interface IUser {
	email: string;
	uid: string;
	displayName: string;
	photoUrl: string;
}
