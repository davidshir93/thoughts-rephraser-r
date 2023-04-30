import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
	CHAT_GPT_API_KEY,
	DISTORTIONS_NAMES,
	DISTORTIONS_TYPE,
} from '../../const';
import {
	addThought,
	updateThought,
	setCurrentThought,
} from '../../features/thoughts/thoughtsSlice';
import Button from '../design-library/Button/Button';
import Pill from '../design-library/Pill/Pill';
import './ThoughtForm.scss';
import axios from 'axios';

export default function ThoughtForm() {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user.user);

	// Handeling Edit Mode
	const thoguhts = useAppSelector((state) => state).thoughts.thoughts;
	const currentThoughtId = useAppSelector(
		(state) => state.thoughts.currentThoughtId
	);
	const currentThoughtObj = currentThoughtId
		? thoguhts.find((thoguht) => thoguht.id === currentThoughtId)
		: null;
	const editMode = currentThoughtObj !== null;

	// Component State
	const [original, setOriginal] = useState(currentThoughtObj?.original || '');
	const [rephrased, setRephrased] = useState(
		currentThoughtObj?.rephrased || ''
	);
	const [originalDistortions, setOriginalDistortions] = useState<
		(keyof DISTORTIONS_TYPE)[]
	>([]);
	const [errorMsg, setErrorMsg] = useState('');

	useEffect(() => {
		setOriginal(currentThoughtObj?.original || '');
		setRephrased(currentThoughtObj?.rephrased || '');
	}, [currentThoughtId]);

	function onOriginalInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setOriginal(e.target.value);
	}

	function onRephrasedInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setRephrased(e.target.value);
	}

	const formIsValid = original !== '' && rephrased !== '';

	const clearForm = () => {
		setOriginal('');
		setRephrased('');
	};

	function handleSumbit() {
		console.log('please sumbit form form is valid?', formIsValid);
		if (user?.uid && formIsValid) {
			setErrorMsg('');
			const payload = {
				id: currentThoughtId || '',
				original,
				rephrased,
				distortions: originalDistortions,
				createdBy: user.uid || '',
				createdAt: new Date().toISOString(),
				firstName: user.displayName.split(' ')[0],
				lastName: user.displayName.split(' ')[1],
			};
			if (editMode) {
				dispatch(updateThought(payload));
			} else {
				dispatch(addThought(payload));
				dispatch(setCurrentThought(''));
			}
			clearForm();
		} else {
			setErrorMsg('Please check the form');
		}
	}

	const keyPhrases = Object.keys(DISTORTIONS_NAMES).map((keyName) =>
		keyName.toLowerCase().replaceAll(' ', '').replaceAll('-', '')
	);

	const fireChatGPTAnalytics = async () => {
		// const response = await axios.post(
		// 	'https://api.openai.com/v1/completions',
		// 	{
		// 		prompt: `create a numbered list of titles of cognitive distortions can be found in this sentence: "${original}"`,
		// 		model: 'text-curie-001',
		// 		max_tokens: 1050,
		// 		n: 1,
		// 		stop: ['{}'],
		// 	},
		// 	{
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			Authorization: `Bearer ${CHAT_GPT_API_KEY}`,
		// 		},
		// 	}
		// );

		const response = await axios.get('http://localhost:8000/distortions', {
			params: { sentence: original },
		});

		// const resToUse = response.data.choices;
		const resToUse = response.data[0].text;
		// console.log(response.data[0].text);
		const listOfDistortionsAsString = resToUse
			.toLowerCase()
			.replaceAll(' ', '')
			.replaceAll('-', '');

		setOriginalDistortions([]);

		for (let i = 0; i < keyPhrases.length; i++) {
			if (listOfDistortionsAsString.includes(keyPhrases[i])) {
				if (
					!originalDistortions.includes(keyPhrases[i] as keyof DISTORTIONS_TYPE)
				) {
					setOriginalDistortions((prevArr: any) => [...prevArr, keyPhrases[i]]);
				}
			}
		}
	};

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
							value={original}
							onChange={onOriginalInputChange}
						/>
						{originalDistortions && originalDistortions.length > 0 ? (
							<>
								<div className="distortions-tags-container">
									{originalDistortions.length > 0 &&
										originalDistortions.map((distortion) => (
											<Pill
												key={distortion}
												label={DISTORTIONS_NAMES[distortion]}
												state="regular"
											/>
										))}
								</div>

								<div className="left-side rephrased">
									<p className="bold">Rephrased</p>
									<p className="caption">
										Now, try to rephrased to get rid of those cognitive
										distortions!
									</p>
									<textarea
										name="rephrased"
										id="rephrased"
										rows={5}
										value={rephrased}
										onChange={onRephrasedInputChange}
									/>
								</div>

								<div className="bottom">
									<div className="right-side">
										{errorMsg && (
											<div className="error caption">{errorMsg}</div>
										)}
										<Button
											label={
												editMode ? 'Save Changes' : 'Share with the community'
											}
											disabled={!user}
											onClick={handleSumbit}
											type="primary"
										/>
									</div>
								</div>
							</>
						) : (
							<Button
								label="Find Cognitive Distortions"
								onClick={fireChatGPTAnalytics}
								type="primary"
							/>
						)}
					</div>
				</div>
			</form>
		</>
	);
}
