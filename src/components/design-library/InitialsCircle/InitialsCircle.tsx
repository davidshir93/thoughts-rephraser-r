import './InitialsCircle.scss';

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
		<div className="initials-circle bold">
			{firstLetter}
			{secondLetter}
		</div>
	);
}
