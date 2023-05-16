import { useAppDispatch } from '../../app/hooks';
import { setDistortion } from '../../features/distortion/distortionSlice';
import { DISTORTIONS_TYPE } from '../../const';
import './DistortionCard.scss';

type DistortionCardProps = {
	name: keyof DISTORTIONS_TYPE;
	title: string;
};

export default function DistortionCard({ name, title }: DistortionCardProps) {
	const dispatch = useAppDispatch();
	function handleDistortionClick() {
		dispatch(setDistortion(name));
	}

	return (
		<>
			<div className={`distortion-card`} onClick={handleDistortionClick}>
				<h2>{title}</h2>
			</div>
		</>
	);
}
