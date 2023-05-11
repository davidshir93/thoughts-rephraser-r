import { configureStore } from '@reduxjs/toolkit';
import thoughtsReducer from '../features/thoughts/thoughtsSlice';
import userReducer from '../features/user/userSlice';
import distortionReducer from '../features/distortion/distortionSlice';

const store = configureStore({
	reducer: {
		thoughts: thoughtsReducer,
		user: userReducer,
		distortion: distortionReducer,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
