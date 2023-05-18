import { motion } from 'framer-motion';
import { containerAnimationParams, itemAnimationParams } from '../../../const';

export default function About() {
	return (
		<motion.div
			variants={containerAnimationParams}
			initial="hidden"
			animate="show">
			<motion.div variants={itemAnimationParams}>
				<h2>About</h2>
			</motion.div>
			<motion.div variants={itemAnimationParams}>
				<p className="left-aligned">
					Thoughts Challenger is a web application that provides users with a
					powerful tool to challenge their thoughts, identify cognitive
					distortions, and gain mental clarity.
				</p>
			</motion.div>
		</motion.div>
	);
}
