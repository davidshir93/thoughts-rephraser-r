import { useRef, useState } from 'react';
import Button from '../../design-library/Button/Button';
import './Login.scss';
import { auth } from '../../../firebase';
import {
	GoogleAuthProvider,
	signInWithPopup,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const email = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);

	const navigate = useNavigate();
	const [authing, setAuthing] = useState(false);

	const signInWithGoogle = async () => {
		setAuthing(true);
		signInWithPopup(auth, new GoogleAuthProvider())
			.then((response) => {
				console.log(response.user.uid);
				navigate('/');
			})
			.catch((err) => {
				console.log(err);
				setAuthing(false);
			});
	};

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log('submit login form');
		console.log('email ', email.current!.value);
		console.log('password ', password.current!.value);
		// await loginToApp(e);
		await signInWithEmailAndPassword(
			auth,
			email.current!.value,
			password.current!.value
		)
			// returns  an auth object after a successful authentication
			// userAuth.user contains all our user details
			.then((userAuth) => {
				// store the user's information in the redux state
				// dispatch(
				// 	login({
				// 		email: userAuth.user.email,
				// 		uid: userAuth.user.uid,
				// 		displayName: userAuth.user.displayName,
				// 		photoUrl: userAuth.user.photoURL,
				// 	})
				// );
			})
			// display the error if any
			.catch((err) => {
				alert(err);
			});
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
				<Button
					label="Login With Google"
					type="primary"
					onClick={() => signInWithGoogle()}
					disabled={authing}
				/>
			</form>
		</>
	);
}
