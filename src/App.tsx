import './App.scss';
import NavBar from './components/layout/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/layout/Home/Home';
import Learn from './components/layout/Learn/Learn';
import About from './components/layout/About/About';
import Login from './components/auth/Login/Login';
import SignUp from './components/auth/SignUp/SignUp';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { fetchThoughts } from './features/thoughts/thoughtsSlice';

function App() {
	const thoughts = useAppSelector((state) => state.thoughts.thoughts);

	const dispatch = useAppDispatch();
	useEffect(() => {
		if (thoughts.length === 0) {
			dispatch(fetchThoughts());
		}
	}, []);

	return (
		<BrowserRouter>
			<div className="App">
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/learn" element={<Learn />} />
					<Route path="/about" element={<About />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
