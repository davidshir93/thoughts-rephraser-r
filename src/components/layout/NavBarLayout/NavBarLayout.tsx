import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Modal from '../../design-library/Modal/Modal';
import { DISTORTIONS_NAMES_AND_DESCRIPTIONS } from '../../../const';
import { setDistortion } from '../../../features/distortion/distortionSlice';

export function NavBarLayout() {
	const dispatch = useAppDispatch();
	// const isLoading = useAppSelector((state) => state.thoughts.isLoading);
	const distortionName = useAppSelector(
		(state) => state.distortion.distortionName
	);

	function closeDistortionModal() {
		dispatch(setDistortion(''));
	}
	return (
		<div className="App">
			<NavBar />
			<div className="content-container">
				{distortionName !== '' && (
					<Modal
						title={DISTORTIONS_NAMES_AND_DESCRIPTIONS[distortionName].title}
						content={
							DISTORTIONS_NAMES_AND_DESCRIPTIONS[distortionName].description
						}
						closeBtnText="Got it!"
						onBtnClick={closeDistortionModal}
					/>
				)}
				<Outlet />
			</div>
		</div>
	);
}
