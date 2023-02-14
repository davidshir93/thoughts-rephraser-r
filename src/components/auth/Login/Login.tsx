import { useRef } from 'react';
import Button from '../../design-library/Button/Button';
import './Login.scss';

export default function Login() {
	const email = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log('submit login form');
		console.log('email ', email.current!.value);
		console.log('password ', password.current!.value);
	}

	return (
		<>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">Email</label>
				<input
					type="text"
					id="email"
					ref={email}
					placeholder="youremail@gmail.com"
				/>
				<label htmlFor="password">Password</label>
				<input type="password" ref={password} id="password" />
				<Button label="Login" type="sumbit" />
			</form>
		</>
	);
}
