import { Link, NavLink } from 'react-router-dom';
import Button from '../../design-library/Button/Button';
import InitialsCircle from '../../design-library/InitialsCircle/InitialsCircle';
import './NavBar.scss';

import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';

import { login, logout } from '../../../features/user/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';

export default function NavBar() {
	const user = useAppSelector((state) => state.user.user);
	const dispatch = useAppDispatch();

	// check at page load if a user is authenticated
	useEffect(() => {
		onAuthStateChanged(auth, (userAuth) => {
			if (userAuth) {
				// user is logged in, send the user's details to redux, store the current user in the state
				dispatch(
					login({
						email: userAuth.email!,
						uid: userAuth.uid!,
						displayName: userAuth.displayName!,
						photoUrl: userAuth.photoURL!,
					})
				);
			} else {
				dispatch(logout());
			}
		});
	}, []);

	return (
		<div className="navbar-container">
			<Link to="/">
				<h2>Thoughts Rephraser</h2>
			</Link>
			<div className="right-side">
				<NavLink to="/">Home</NavLink>
				<NavLink to="/learn">Learn</NavLink>
				<NavLink to="/about">About</NavLink>
				{user?.uid ? (
					<div className="logged">
						<InitialsCircle
							firstName={user.displayName?.split(' ')[0] || 'Hello'}
							lastName={user.displayName?.split(' ')[1] || 'World'}
						/>
					</div>
				) : (
					<div className="guest">
						<Link to="/login">
							<Button label="Login" type="secondary" />
						</Link>
						<Link to="/signup">
							<Button label="Signup" type="primary" />
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
