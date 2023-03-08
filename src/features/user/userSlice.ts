import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserState } from '../../interfaces';

const initialState: IUserState = {
	loading: false,
	user: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload;
		},
		logout: (state) => {
			state.user = null;
		},
	},
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
