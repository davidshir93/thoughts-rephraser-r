import { useEffect, useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
	DISTORTIONS_NAMES_MAP,
	DISTORTIONS_NAMES_AND_DESCRIPTIONS,
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

const keyPhrases = Object.keys(DISTORTIONS_NAMES_MAP);

export default function ThoughtForm() {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user.user);

	// Handeling Edit Mode
	const thoughts = useAppSelector((state) => state).thoughts.thoughts;
	const currentThoughtId = useAppSelector(
		(state) => state.thoughts.currentThoughtId
	);
	const currentThoughtObj = currentThoughtId
		? thoughts.find((thoguht) => thoguht.id === currentThoughtId)
		: null;
	const editMode = currentThoughtObj !== null;

	// Component State
	const [original, setOriginal] = useState(currentThoughtObj?.original || '');
	const [rephrased, setRephrased] = useState(
		currentThoughtObj?.rephrased || ''
	);
	const [originalDistortions, setOriginalDistortions] = useState<
		(keyof DISTORTIONS_TYPE)[]
	>(currentThoughtObj?.distortions || []);
	const [errorMsg, setErrorMsg] = useState('');
	const [distortionsLoading, setDistortionsLoading] = useState(false);

	const uniqueDistortions = useMemo((): (keyof DISTORTIONS_TYPE)[] => {
		return Array.from(
			new Set(
				originalDistortions.map(
					(distortion) => DISTORTIONS_NAMES_MAP[distortion]
				)
			)
		) as (keyof DISTORTIONS_TYPE)[];
	}, [originalDistortions, editMode]);

	useEffect(() => {
		setOriginal(currentThoughtObj?.original || '');
		setRephrased(currentThoughtObj?.rephrased || '');
		setOriginalDistortions(currentThoughtObj?.distortions || []);
	}, [currentThoughtId]);

	function onOriginalInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setOriginal(e.target.value);
	}

	function onRephrasedInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setRephrased(e.target.value);
	}

	const formIsValid = original !== '' && rephrased !== '';

	const clearForm = () => {
		if (editMode) {
			dispatch(setCurrentThought(''));
		}
		setOriginal('');
		setRephrased('');
		setOriginalDistortions([]);
	};

	function handleSumbit() {
		console.log('please sumbit form form is valid?', formIsValid);
		if (user?.uid && formIsValid) {
			setErrorMsg('');
			const payload = {
				id: currentThoughtId || '',
				original,
				rephrased,
				distortions: uniqueDistortions,
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

	const fireChatGPTAnalytics = async () => {
		console.log('Looking for distortions...');
		setDistortionsLoading(true);
		const response = await axios.get('http://localhost:8000/distortions', {
			params: { sentence: original },
		});

		const resToUse = response.data[0].text;

		const listOfDistortionsAsString = resToUse
			.toLowerCase()
			.replaceAll(' ', '')
			.replaceAll('-', '');

		setOriginalDistortions([]);

		const foundDistortions: (keyof DISTORTIONS_TYPE)[] = [];
		for (let i = 0; i < keyPhrases.length; i++) {
			if (listOfDistortionsAsString.includes(keyPhrases[i])) {
				if (
					!foundDistortions.includes(keyPhrases[i] as keyof DISTORTIONS_TYPE)
				) {
					foundDistortions.push(keyPhrases[i] as keyof DISTORTIONS_TYPE);
				}
			}
		}

		// Making sure we've found some distortions, otherwise recall the function
		if (foundDistortions.length >= 1) {
			setOriginalDistortions(foundDistortions);
			setDistortionsLoading(false);
		} else {
			fireChatGPTAnalytics();
		}
	};

	const mainCtaText = useMemo(() => {
		if (editMode) {
			return 'Save Changes';
		} else if (user) {
			return 'Share With the Community';
		} else {
			return 'Log in to share with the Community';
		}
	}, [editMode, user]);

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
						{uniqueDistortions && uniqueDistortions?.length > 0 ? (
							<>
								<div className="distortions-tags-container">
									{uniqueDistortions?.length > 0 &&
										uniqueDistortions.map((distortion) => (
											<Pill
												key={distortion}
												label={
													DISTORTIONS_NAMES_AND_DESCRIPTIONS[distortion].title
												}
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
											label={editMode ? 'Cancel' : 'Restart'}
											type="secondary"
											onClick={clearForm}
										/>
										<Button
											label={mainCtaText}
											disabled={!user}
											onClick={handleSumbit}
											type="primary"
										/>
									</div>
								</div>
							</>
						) : (
							<Button
								label={
									distortionsLoading
										? 'Loading...'
										: 'Find Cognitive Distortions'
								}
								onClick={fireChatGPTAnalytics}
								disabled={distortionsLoading}
								type="primary"
							/>
						)}
					</div>
				</div>
			</form>
		</>
	);
}
