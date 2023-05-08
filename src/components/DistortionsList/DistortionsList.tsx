import DistortionCard from '../DistortionCard/DistortionCard';
import './DistortionsList.scss';
import {
	DISTORTIONS_NAMES_AND_DESCRIPTIONS,
	DISTORTIONS_TYPE,
} from '../../const';

export default function DistortionsList() {
	const names = Object.keys(
		DISTORTIONS_NAMES_AND_DESCRIPTIONS
	) as (keyof DISTORTIONS_TYPE)[];
	return (
		<div className="distortions-grid-container">
			{names.length > 0 &&
				names.map((name) => {
					if (DISTORTIONS_NAMES_AND_DESCRIPTIONS.hasOwnProperty(name)) {
						return (
							<DistortionCard
								key={name}
								title={DISTORTIONS_NAMES_AND_DESCRIPTIONS[name].title}
								description={
									DISTORTIONS_NAMES_AND_DESCRIPTIONS[name].description
								}
							/>
						);
					}
				})}
		</div>
	);
}
