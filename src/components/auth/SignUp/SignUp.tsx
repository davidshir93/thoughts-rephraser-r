import { useRef } from 'react';
import Button from '../../design-library/Button/Button';
import './SignUp.scss';

export default function SignUp() {
	const firstName = useRef<HTMLInputElement>(null);
	const lastName = useRef<HTMLInputElement>(null);
	const email = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log('submit SignUp form');
		console.log('firstName ', firstName.current!.value);
		console.log('lastName ', lastName.current!.value);
		console.log('email ', email.current!.value);
		console.log('password ', password.current!.value);
	}

	return (
		<>
			<h2>SignUp</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="firstName">First Name</label>
				<input type="text" id="firstName" ref={firstName} />
				<label htmlFor="lastName">Last Name</label>
				<input type="text" id="lastName" ref={lastName} />
				<label htmlFor="email">Email</label>
				<input
					type="text"
					id="email"
					ref={email}
					placeholder="youremail@gmail.com"
				/>
				<label htmlFor="password">Password</label>
				<input type="password" ref={password} id="password" />
				<Button label="Sign up" type="sumbit" />
			</form>
		</>
	);
}
