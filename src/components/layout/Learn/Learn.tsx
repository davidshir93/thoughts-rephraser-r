import { itemAnimationParams } from '../../../const';
import DistortionsList from '../../DistortionsList/DistortionsList';
import { motion } from 'framer-motion';
export default function Learn() {
	return (
		<>
			<motion.div
				variants={itemAnimationParams}
				initial="hidden"
				animate="show">
				<h2>Distortions List</h2>
			</motion.div>
			<DistortionsList />
		</>
	);
}
