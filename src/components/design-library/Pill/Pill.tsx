import './Pill.scss';

type PillProps = {
	label: string;
	state?: 'regular' | 'hover' | 'crossed';
	onClick?: () => void;
};

export default function Pill({ label, state = 'regular', onClick }: PillProps) {
	return (
		<div className={`pill caption ${state}`} onClick={onClick}>
			{label}
		</div>
	);
}
