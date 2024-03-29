import { Link, NavLink } from 'react-router-dom';
import Button from '../../design-library/Button/Button';
import InitialsCircle from '../../design-library/InitialsCircle/InitialsCircle';
import './NavBar.scss';

import { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';

import { login, logout } from '../../../features/user/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';

const navLinks = [
	{ path: '/', title: 'Home' },
	{ path: '/learn', title: 'Learn' },
	{ path: '/about', title: 'About' },
];

export default function NavBar() {
	const user = useAppSelector((state) => state.user.user);
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector((state) => state.thoughts.isLoading);

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

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	function handleHamburgerClick() {
		setMobileMenuOpen((prev) => !prev);
	}

	return (
		<div className="navbar-float">
			<div className="navbar-container">
				<div className="hamburger">
					<i className="material-icons" onClick={handleHamburgerClick}>
						menu
					</i>
				</div>
				<Link to="/">
					<h2>Thoughts Challenger</h2>
				</Link>
				{!isLoading && (
					<div className={`right-side ${mobileMenuOpen && 'mobile-menu-open'}`}>
						{navLinks.map((link) => (
							<NavLink
								key={link.path}
								onClick={handleHamburgerClick}
								to={link.path}>
								{link.title}
							</NavLink>
						))}
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
									<Button
										onClick={handleHamburgerClick}
										label="Login"
										type="secondary"
									/>
								</Link>
								<Link to="/signup">
									<Button
										onClick={handleHamburgerClick}
										label="Signup"
										type="secondary"
									/>
								</Link>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
