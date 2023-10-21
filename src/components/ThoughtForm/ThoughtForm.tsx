import { useEffect, useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
	DISTORTIONS_NAMES_MAP,
	DISTORTIONS_NAMES_AND_DESCRIPTIONS,
	DISTORTIONS_TYPE,
	itemAnimationParams,
	containerAnimationParams,
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
const initialErrorObj = { original: '', rephrased: '' };

export default function ThoughtForm() {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user.user);

	// Handeling Edit Mode
	const thoughts = useAppSelector((state) => state).thoughts.thoughts;
	const currentThoughtId = useAppSelector(
		(state) => state.thoughts.currentThoughtId
	);
	const currentThoughtObj = currentThoughtId
		? thoughts.find((thought) => thought.id === currentThoughtId)
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
	const [errorsObj, setErrorObj] = useState(() => {
		return initialErrorObj;
	});
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

	const clearForm = () => {
		if (editMode) {
			dispatch(setCurrentThought(''));
		}
		setOriginal('');
		setRephrased('');
		setOriginalDistortions([]);
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	};

	function handleSumbit() {
		if (rephrased.split(' ').length < 5) {
			setErrorObj((prev) => {
				return { ...prev, rephrased: 'Please write at least 5 words' };
			});
		} else {
			if (user?.uid) {
				setErrorObj(initialErrorObj);
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
			}
		}
	}

	const fireChatGPTAnalytics = () => {
		let attempts = 0;
		return async function () {
			if (original.split(' ').length < 5) {
				setErrorObj((prev) => {
					return { ...prev, original: 'Please write at least 5 words' };
				});
				return;
			} else {
				setErrorObj(initialErrorObj);
			}
			attempts++;
			if (attempts > 3) {
				setErrorObj((prev) => {
					return {
						...prev,
						original: 'Please try again, or try another sentence',
					};
				});
				setDistortionsLoading(false);
				return;
			}
			console.log('Looking for distortions...');
			setDistortionsLoading(true);
			const response = await axios.get(
				'https://thoughts-server-j5mw.onrender.com/distortions',
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
				safeFireChatGPTAnalytics();
			}
		};
	};

	const safeFireChatGPTAnalytics = fireChatGPTAnalytics();

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
			<form action="handleSumbit" className="new-thought-form">
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
							disabled={originalDistortions?.length > 0}
						/>
						{errorsObj.original && (
							<div className="error">{errorsObj.original}</div>
						)}
						{originalDistortions?.length > 0 ? (
							<>
								<motion.div
									className="distortions-tags-container"
									variants={containerAnimationParams}
									initial="hidden"
									animate="show">
									{originalDistortions.map((distortion) => (
										<motion.div variants={itemAnimationParams}>
											<Pill
												key={distortion}
												label={
													DISTORTIONS_NAMES_AND_DESCRIPTIONS[distortion].title
												}
												state="regular"
												onClick={() => handleDistortionClick(distortion)}
											/>
										</motion.div>
									))}
								</motion.div>

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
									{errorsObj.rephrased && (
										<div className="error">{errorsObj.rephrased}</div>
									)}
								</div>

								<div className="bottom">
									<div className="right-side">
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
								onClick={safeFireChatGPTAnalytics}
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
