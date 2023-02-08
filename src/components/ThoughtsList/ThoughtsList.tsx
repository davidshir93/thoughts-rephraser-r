import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ThoughtCard from '../ThoughtCard/ThoughtCard';
import './ThoughtsList.scss';

export default function ThoughtsList() {
	const dispatch = useDispatch();
	const thoguhts = useSelector((state: RootState) => state).thoughtsReducer
		.thoughts;

	return (
		<div className="thoguhts-grid-container">
			{thoguhts.length > 0 &&
				thoguhts.map((thoguht) => (
					<ThoughtCard key={thoguht.id} thought={thoguht} />
				))}
		</div>
	);
}
