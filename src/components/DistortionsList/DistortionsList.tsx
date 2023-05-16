import DistortionCard from '../DistortionCard/DistortionCard';
import {
	DISTORTIONS_NAMES_AND_DESCRIPTIONS,
	DISTORTIONS_TYPE,
	containerAnimationParams,
	itemAnimationParams,
} from '../../const';
import { motion } from 'framer-motion';
import './DistortionsList.scss';

export default function DistortionsList() {
	const names = Object.keys(
		DISTORTIONS_NAMES_AND_DESCRIPTIONS
	) as (keyof DISTORTIONS_TYPE)[];

	return (
		<motion.div
			className="distortions-grid-container"
			variants={containerAnimationParams}
			initial="hidden"
			animate="show">
			{names.map((name) => {
				if (DISTORTIONS_NAMES_AND_DESCRIPTIONS.hasOwnProperty(name)) {
					return (
						<motion.div key={name} variants={itemAnimationParams}>
							<DistortionCard
								key={name}
								name={name}
								title={DISTORTIONS_NAMES_AND_DESCRIPTIONS[name].title}
							/>
						</motion.div>
					);
				}
			})}
		</motion.div>
	);
}
