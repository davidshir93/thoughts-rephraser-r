import { createBrowserRouter } from 'react-router-dom';
import { NavBarLayout } from './components/layout/NavBarLayout/NavBarLayout';
import { lazy } from 'react';
// Changing to dynamic importing
// import Home from './components/layout/Home/Home';
// import Learn from './components/layout/Learn/Learn';
// import About from './components/layout/About/About';
// import Login from './components/auth/Login/Login';
// import SignUp from './components/auth/SignUp/SignUp';

const Home = lazy(() => import('./components/layout/Home/Home'));
const Learn = lazy(() => import('./components/layout/Learn/Learn'));
const About = lazy(() => import('./components/layout/About/About'));
const Login = lazy(() => import('./components/auth/Login/Login'));
const SignUp = lazy(() => import('./components/auth/SignUp/SignUp'));

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
