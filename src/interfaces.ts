import { DISTORTIONS_TYPE } from './const';

export interface IThought {
	id: string;
	original: string;
	rephrased: string;
	distortions: (keyof DISTORTIONS_TYPE)[];
	createdBy: String;
	firstName: String;
	lastName: String;
}

export interface IThoughtsState {
	thoughts: IThought[];
	currentThoughtId: string;
}

export interface IAuthState {
	user: Object;
}
