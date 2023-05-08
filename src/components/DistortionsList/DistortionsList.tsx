import DistortionCard from '../DistortionCard/DistortionCard';
import './DistortionsList.scss';
import { DISTORTIONS_NAMES_AND_DESCRIPTIONS } from '../../const';

export default function DistortionsList() {
	const names = Object.keys(DISTORTIONS_NAMES_AND_DESCRIPTIONS);
	return (
		<div className="distortions-grid-container">
			{names.length > 0 &&
				names.map((name) => {
					return (
						<DistortionCard
							key={name}
							title={DISTORTIONS_NAMES_AND_DESCRIPTIONS[name].title}
							description={DISTORTIONS_NAMES_AND_DESCRIPTIONS[name].description}
						/>
					);
				})}
		</div>
	);
}
