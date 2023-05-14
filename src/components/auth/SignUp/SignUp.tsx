import { useRef } from 'react';
import Button from '../../design-library/Button/Button';
import './SignUp.scss';
import { auth, updateProfile } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { login } from '../../../features/user/userSlice';

export default function SignUp() {
	const firstName = useRef<HTMLInputElement>(null);
	const lastName = useRef<HTMLInputElement>(null);
	const email = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const userAuth = await createUserWithEmailAndPassword(
			auth,
			email?.current?.value || '',
			password?.current?.value || ''
		);

		await updateProfile(userAuth.user, {
			displayName: firstName.current!.value + ' ' + lastName.current!.value,
			photoURL: '/',
		});

		dispatch(
			login({
				email: userAuth.user.email!,
				uid: userAuth.user.uid,
				displayName: userAuth.user.displayName!,
				photoUrl: userAuth.user.photoURL!,
			})
		);

		navigate('/');
	}

	return (
		<>
			<h2>Sign Up</h2>
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
