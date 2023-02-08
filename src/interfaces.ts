export interface IThought {
	id: string;
	original: string;
	rephrased: string;
	distortions: string[];
	createdBy: String;
	firstName: String;
	lastName: String;
}

export interface IState {
	thoughts: IThought[];
}
