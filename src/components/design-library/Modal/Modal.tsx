import Button from '../Button/Button';
import './Modal.scss';

type ModalProps = {
	title: string;
	content: string;
	closeBtnText: string;
	onBtnClick: () => void;
};

export default function Modal({
	title,
	content,
	closeBtnText,
	onBtnClick,
}: ModalProps) {
	return (
		<div className="tr-modal-container">
			<div className="tr-modal">
				<h2>{title}</h2>
				<p>{content}</p>
				<Button
					label={closeBtnText}
					type="primary"
					onClick={onBtnClick}></Button>
			</div>
		</div>
	);
}
