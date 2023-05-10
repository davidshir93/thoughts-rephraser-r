import { RouterProvider } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { fetchThoughts } from './features/thoughts/thoughtsSlice';
import { router } from './router';
import './App.scss';

function App() {
	const thoughts = useAppSelector((state) => state.thoughts.thoughts);

	const dispatch = useAppDispatch();
	useEffect(() => {
		if (thoughts.length === 0) {
			dispatch(fetchThoughts());
		}
	}, []);

	return <RouterProvider router={router} />;
}

export default App;
