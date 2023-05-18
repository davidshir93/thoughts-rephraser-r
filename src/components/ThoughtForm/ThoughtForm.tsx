import { useEffect, useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
	DISTORTIONS_NAMES_MAP,
	DISTORTIONS_NAMES_AND_DESCRIPTIONS,
	DISTORTIONS_TYPE,
	itemAnimationParams,
} from '../../const';
import {
	addThought,
	updateThought,
	setCurrentThought,
} from '../../features/thoughts/thoughtsSlice';
import { setDistortion } from '../../features/distortion/distortionSlice';
import { motion } from 'framer-motion';

import Button from '../design-library/Button/Button';
import Pill from '../design-library/Pill/Pill';
import axios from 'axios';

import './ThoughtForm.scss';

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

	useEffect(() => {
		setOriginal(currentThoughtObj?.original || '');
		setRephrased(currentThoughtObj?.rephrased || '');
		setOriginalDistortions(currentThoughtObj?.distortions || []);
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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

	const fireChatGPTAnalytics = async () => {
		console.log('Looking for distortions...');
		setDistortionsLoading(true);
		const response = await axios.get(
			'https://thoughts-server.herokuapp.com/distortions',
			{
				params: { sentence: original },
			}
		);
		console.log(response.data);

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
					!foundDistortions.includes(
						DISTORTIONS_NAMES_MAP[
							keyPhrases[i] as keyof DISTORTIONS_TYPE
						] as keyof DISTORTIONS_TYPE
					)
				) {
					foundDistortions.push(
						DISTORTIONS_NAMES_MAP[
							keyPhrases[i] as keyof DISTORTIONS_TYPE
						] as keyof DISTORTIONS_TYPE
					);
				}
			}
		}

		console.log(foundDistortions);

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

	function handleDistortionClick(distortion: keyof DISTORTIONS_TYPE) {
		dispatch(setDistortion(distortion));
	}

	return (
		<motion.div variants={itemAnimationParams} initial="hidden" animate="show">
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
						{/* TODO: Add Error message */}
						{originalDistortions?.length > 0 ? (
							<>
								<div className="distortions-tags-container">
									{originalDistortions.map((distortion) => (
										<Pill
											key={distortion}
											label={
												DISTORTIONS_NAMES_AND_DESCRIPTIONS[distortion].title
											}
											state="regular"
											onClick={() => handleDistortionClick(distortion)}
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
		</motion.div>
	);
}
