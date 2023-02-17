import { Link, NavLink } from 'react-router-dom';
import Button from '../../design-library/Button/Button';
import InitialsCircle from '../../design-library/InitialsCircle/InitialsCircle';
import './NavBar.scss';

export default function NavBar() {
	const logged = false;
	// const logged = true;
	return (
		<div className="navbar-container">
			<Link to="/">
				<h2>Thoughts Rephraser</h2>
			</Link>
			<div className="right-side">
				<NavLink to="/">Home</NavLink>
				<NavLink to="/learn">Learn</NavLink>
				<NavLink to="/about">About</NavLink>
				{logged ? (
					<div className="logged">
						<InitialsCircle firstName="David" lastName="Shir" />
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
