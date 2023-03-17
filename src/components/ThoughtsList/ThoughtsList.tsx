import ThoughtCard from '../ThoughtCard/ThoughtCard';
import './ThoughtsList.scss';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
	addThought,
	fetchThoughts,
} from '../../features/thoughts/thoughtsSlice';
import { useEffect } from 'react';

export default function ThoughtsList() {
	const thoughts = useAppSelector((state) => state.thoughts.thoughts);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchThoughts());
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
