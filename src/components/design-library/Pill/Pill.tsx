import './Pill.scss';

type PillProps = {
	label: string;
	state?: 'regular' | 'hover' | 'crossed';
};

export default function Pill({ label, state = 'regular' }: PillProps) {
	return <div className={`pill caption ${state}`}>{label}</div>;
}
