import { useState } from 'react';
import './DistortionCard.scss';

type DistortionCardProps = {
	title: String;
	description: String;
};

export default function DistortionCard({
	title,
	description,
}: DistortionCardProps) {
	const [revealDescription, setRevealDescription] = useState(false);

	function onCardClick() {
		setRevealDescription((prev) => !prev);
	}

	return (
		<>
			<div className={`distortion-card`} onClick={onCardClick}>
				{revealDescription ? (
					<>
						<h2>{title}</h2>
						<p>{description}</p>
					</>
				) : (
					<h2>{title}</h2>
				)}
			</div>
		</>
	);
}
