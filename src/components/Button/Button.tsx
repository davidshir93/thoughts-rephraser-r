import './Button.scss';

type ButtonProps = {
	label: string;
	disabled: boolean;
	type: 'primary' | 'secondary';
	onClick: () => void;
};

export default function Button({
	label,
	type,
	disabled,
	onClick,
}: ButtonProps) {
	return (
		<button
			type="button"
			className={`tr-button ${type} ${disabled && 'disabled'}`}
			disabled={disabled}
			onClick={onClick}>
			{label}
		</button>
	);
}
