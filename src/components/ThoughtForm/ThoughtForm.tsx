import { useState } from 'react';
import { DISTORTIONS_NAMES } from '../../const';
import Button from '../Button/Button';
import Pill from '../Pill/Pill';
import './ThoughtForm.scss';

export default function ThoughtForm() {
	const userLogged = true;
	const editMode = false;
	const distortions = ['blackAndWhiteThinking', 'catastrophizing'];

	const [errorMsg, setErrorMsg] = useState('');

	function onOriginalInputChange() {
		console.log('original input changed');
	}

	function onRephrasedInputChange() {
		console.log('rephrased input changed');
	}

	function handleSumbit() {
		console.log('please sumbit form');
	}

	return (
		<>
			<form action="handleSumbit" className="new-thoguht-form">
				<div className="inputs-container">
					<div className="right-side original">
						<p className="bold">Original</p>
						<p className="caption">
							{'Write down what you are thinking now, no filters please :)'}
						</p>
						<textarea
							name="original"
							id="original"
							rows={5}
							value="original"
							onChange={onOriginalInputChange}></textarea>
						<div className="distortions-tags-container">
							{distortions.length > 0 &&
								distortions.map((distortion) => (
									<Pill
										key={distortion}
										label={DISTORTIONS_NAMES[distortion]}
										state="regular"
									/>
								))}
						</div>
					</div>
					<div className="left-side rephrased">
						<p className="bold">Rephrased</p>
						<p className="caption">
							Try to rephrased to get rid of those cognitive distortions!
						</p>
						<textarea
							name="rephrased"
							id="rephrased"
							rows={5}
							value="rephrased"
							onChange={onRephrasedInputChange}></textarea>
						<div className="distortions-tags-container">
							{distortions.length > 0 &&
								distortions.map((distortion) => (
									<Pill
										key={distortion}
										label={DISTORTIONS_NAMES[distortion]}
										state="regular"
									/>
								))}
						</div>
					</div>
				</div>
				<div className="bottom">
					<div className="right-side">
						{errorMsg && <div className="error caption">{errorMsg}</div>}
						<Button
							label={editMode ? 'Save Changes' : 'Share with the community'}
							disabled={!userLogged}
							onClick={handleSumbit}
							type="primary"
						/>
					</div>
				</div>
			</form>
		</>
	);
}
