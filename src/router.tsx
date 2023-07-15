import { createBrowserRouter } from 'react-router-dom';
import Home from './components/layout/Home/Home';
import Learn from './components/layout/Learn/Learn';
import About from './components/layout/About/About';
import Login from './components/auth/Login/Login';
import SignUp from './components/auth/SignUp/SignUp';
import { NavBarLayout } from './components/layout/NavBarLayout/NavBarLayout';

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
