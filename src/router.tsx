import { Outlet, createBrowserRouter } from 'react-router-dom';
import Home from './components/layout/Home/Home';
import Learn from './components/layout/Learn/Learn';
import About from './components/layout/About/About';
import NavBar from './components/layout/NavBar/NavBar';
import Login from './components/auth/Login/Login';
import SignUp from './components/auth/SignUp/SignUp';

export const router = createBrowserRouter([
	{
		element: <NavBarLayout />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: '/learn', element: <Learn /> },
			{ path: '/about', element: <About /> },
			{ path: '/login', element: <Login /> },
			{ path: '/signup', element: <SignUp /> },
		],
	},
]);

function NavBarLayout() {
	return (
		<div className="App">
			<NavBar />
			<div className="content-container">
				<Outlet />
			</div>
		</div>
	);
}
