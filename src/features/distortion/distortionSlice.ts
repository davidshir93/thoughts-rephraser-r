import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDistortionState } from '../../interfaces';
import { DISTORTIONS_TYPE } from '../../const';

const initialState: IDistortionState = {
	distortionName: '',
};

const distortionSlice = createSlice({
	name: 'distortion',
	initialState,
	reducers: {
		setDistortion: (state, action: PayloadAction<string>) => {
			state.distortionName = action.payload as keyof DISTORTIONS_TYPE;
		},
	},
});

export default distortionSlice.reducer;
export const { setDistortion } = distortionSlice.actions;
