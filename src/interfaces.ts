import { DISTORTIONS_TYPE } from './const';

export interface IThought {
	id: string;
	original: string;
	rephrased: string;
	distortions: (keyof DISTORTIONS_TYPE)[];
	createdBy: string;
	firstName: string;
	lastName: string;
	createdAt: string;
}

export interface IThoughtsState {
	isLoading: boolean;
	error: string;
	thoughts: IThought[];
	currentThoughtId: string;
}

export interface IDistortionState {
	distortionName: keyof DISTORTIONS_TYPE | '';
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

// export interface IDistortion {
// 	title: string;
// 	description: string;
// }
