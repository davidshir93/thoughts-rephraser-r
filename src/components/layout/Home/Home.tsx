import ThoughtForm from '../../ThoughtForm/ThoughtForm';
import ThoughtsList from '../../ThoughtsList/ThoughtsList';
import { useAppSelector } from '../../../app/hooks';
import { Loader } from '../Loader';

export default function Home() {
	const isLoading = useAppSelector((state) => state.thoughts.isLoading);

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<ThoughtForm />
					<ThoughtsList />
				</>
			)}
		</>
	);
}
