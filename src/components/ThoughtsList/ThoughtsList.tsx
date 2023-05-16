import { motion } from 'framer-motion';
import { useAppSelector } from '../../app/hooks';
import ThoughtCard from '../ThoughtCard/ThoughtCard';
import { containerAnimationParams, itemAnimationParams } from '../../const';
import { IThought } from '../../interfaces';
import './ThoughtsList.scss';

export default function ThoughtsList() {
	const thoughts = useAppSelector((state) => state.thoughts.thoughts);

	return (
		<>
			{thoughts?.length > 0 && (
				<motion.div
					className="thoughts-grid-container"
					variants={containerAnimationParams}
					initial="hidden"
					animate="show">
					{thoughts.map((thoguht: IThought) => (
						<motion.div key={thoguht.id} variants={itemAnimationParams}>
							<ThoughtCard thought={thoguht} />
						</motion.div>
					))}
				</motion.div>
			)}
		</>
	);
}
