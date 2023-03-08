import './App.scss';
import NavBar from './components/layout/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/layout/Home/Home';
import Learn from './components/layout/Learn/Learn';
import About from './components/layout/About/About';
import Login from './components/auth/Login/Login';
import SignUp from './components/auth/SignUp/SignUp';

function App() {
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
