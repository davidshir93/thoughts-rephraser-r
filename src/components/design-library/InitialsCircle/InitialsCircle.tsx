import { signOut } from 'firebase/auth';
import './InitialsCircle.scss';
import { auth } from '../../../firebase';

type InitialsCircleProps = {
	firstName: string;
	lastName: string;
};

export default function InitialsCircle({
	firstName,
	lastName,
}: InitialsCircleProps) {
	const firstLetter = firstName[0];
	const secondLetter = lastName[0];
	return (
		<div className="initials-circle bold" onClick={() => signOut(auth)}>
			{firstLetter}
			{secondLetter}
		</div>
	);
}
