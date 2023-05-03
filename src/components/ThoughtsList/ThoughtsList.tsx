import ThoughtCard from '../ThoughtCard/ThoughtCard';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchThoughts } from '../../features/thoughts/thoughtsSlice';
import { useEffect } from 'react';
import './ThoughtsList.scss';

export default function ThoughtsList() {
	const thoughts = useAppSelector((state) => state.thoughts.thoughts);
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (thoughts.length === 0) {
			dispatch(fetchThoughts());
		}
	}, []);

	return (
		<div className="thoguhts-grid-container">
			{thoughts.length > 0 &&
				thoughts.map((thoguht) => (
					<ThoughtCard key={thoguht.id} thought={thoguht} />
				))}
		</div>
	);
}
