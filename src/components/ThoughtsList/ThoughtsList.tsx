import ThoughtCard from '../ThoughtCard/ThoughtCard';
import './ThoughtsList.scss';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

export default function ThoughtsList() {
	const thoughts = useAppSelector((state) => state.thoughts.thoughts);
	const dispatch = useAppDispatch();

	return (
		<div className="thoguhts-grid-container">
			{thoughts.length > 0 &&
				thoughts.map((thoguht) => (
					<ThoughtCard key={thoguht.id} thought={thoguht} />
				))}
		</div>
	);
}
