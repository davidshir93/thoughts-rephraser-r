import { DISTORTIONS_TYPE } from './const';

export interface IThought {
	id: string;
	original: string;
	rephrased: string;
	distortions: (keyof DISTORTIONS_TYPE)[];
	createdBy: string;
	firstName: string;
	lastName: string;
}

export interface IThoughtsState {
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
