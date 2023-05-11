import ThoughtCard from '../ThoughtCard/ThoughtCard';
import { useAppSelector } from '../../app/hooks';
import './ThoughtsList.scss';

export default function ThoughtsList() {
	const thoughts = useAppSelector((state) => state.thoughts.thoughts);

	return (
		<div className="thoughts-grid-container">
			{thoughts.length > 0 &&
				thoughts.map((thoguht) => (
					<ThoughtCard key={thoguht.id} thought={thoguht} />
				))}
		</div>
	);
}
