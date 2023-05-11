import { configureStore } from '@reduxjs/toolkit';
import thoughtsReducer from '../features/thoughts/thoughtsSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
	reducer: {
		thoughts: thoughtsReducer,
		user: userReducer,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
