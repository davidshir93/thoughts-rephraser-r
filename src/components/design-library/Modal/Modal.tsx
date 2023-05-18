import { motion } from 'framer-motion';
import Button from '../Button/Button';
import './Modal.scss';
import { modalAnimationParams } from '../../../const';

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
			<motion.div
				className="tr-modal"
				variants={modalAnimationParams}
				initial="hidden"
				animate="show">
				<h2>{title}</h2>
				<p>{content}</p>
				<Button
					label={closeBtnText}
					type="secondary"
					onClick={onBtnClick}></Button>
			</motion.div>
		</div>
	);
}
