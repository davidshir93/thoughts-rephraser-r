import ThoughtForm from '../../ThoughtForm/ThoughtForm';
import ThoughtsList from '../../ThoughtsList/ThoughtsList';
import { useAppSelector } from '../../../app/hooks';

export default function Home() {
	const isLoading = useAppSelector((state) => state.thoughts.isLoading);

	return (
		<>
			{isLoading ? (
				<div className="loading">
					<span></span>
				</div>
			) : (
				<>
					<ThoughtForm />
					<ThoughtsList />
				</>
			)}
		</>
	);
}
