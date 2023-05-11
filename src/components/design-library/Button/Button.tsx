import './Button.scss';

type ButtonProps = {
	label: string;
	disabled?: boolean;
	type: 'primary' | 'secondary' | 'sumbit';
	onClick?: () => void;
};

export default function Button({
	label,
	type,
	disabled,
	onClick,
}: ButtonProps) {
	return (
		<button
			className={`tr-button ${type} ${disabled && 'disabled'}`}
			disabled={disabled}
			onClick={onClick}
			type={type === 'sumbit' ? 'submit' : 'button'}>
			{label}
		</button>
	);
}
