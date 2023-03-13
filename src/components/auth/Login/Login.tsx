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
import { useAppDispatch } from '../../../app/hooks';
import { login } from '../../../features/user/userSlice';
export default function Login() {
	const email = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);

	const navigate = useNavigate();
	const [authing, setAuthing] = useState(false);

	const dispatch = useAppDispatch();

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
		setAuthing(true);
		try {
			const userAuth = await signInWithEmailAndPassword(
				auth,
				email.current!.value,
				password.current!.value
			);

			dispatch(
				login({
					email: userAuth.user.email!,
					uid: userAuth.user.uid,
					displayName: userAuth.user.displayName!,
					photoUrl: userAuth.user.photoURL!,
				})
			);
			setAuthing(false);
			navigate('/');
		} catch (err) {
			alert(err);
		}
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
				<Button disabled={authing} label="Login" type="sumbit" />
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
