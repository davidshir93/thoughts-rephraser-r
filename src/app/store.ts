import { configureStore } from '@reduxjs/toolkit';
import thoughtsReducer from '../features/thoughts/thoughtsSlice';

const store = configureStore({
	reducer: {
		thoughts: thoughtsReducer,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
