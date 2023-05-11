import ThoughtForm from '../../ThoughtForm/ThoughtForm';
import ThoughtsList from '../../ThoughtsList/ThoughtsList';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Modal from '../../design-library/Modal/Modal';
import { setDistortion } from '../../../features/distortion/distortionSlice';
import {
	DISTORTIONS_NAMES_AND_DESCRIPTIONS,
	DISTORTIONS_TYPE,
} from '../../../const';

export default function Home() {
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector((state) => state.thoughts.isLoading);
	const distortionName = useAppSelector(
		(state) => state.distortion.distortionName
	);

	function closeDistortionModal() {
		dispatch(setDistortion(''));
	}
	return (
		<>
			{isLoading ? (
				<div className="loading">
					<span></span>
				</div>
			) : (
				<>
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
					<ThoughtForm />
					<ThoughtsList />
				</>
			)}
		</>
	);
}
