import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	DISTORTIONS_DICTIONARY,
	DISTORTIONS_DICTIONARY_TYPE,
	DISTORTIONS_NAMES,
	DISTORTIONS_TYPE,
} from '../../const';
import {
	addThought,
	editThought,
	setCurrentThought,
} from '../../redux/actions/thoughtsActions';
import Button from '../Button/Button';
import Pill from '../Pill/Pill';
import './ThoughtForm.scss';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../redux/store';

export default function ThoughtForm() {
	const dispatch = useDispatch();
	const userLogged = true;

	// Handeling Edit Mode
	const thoguhts = useSelector((state: RootState) => state).thoughtsReducer
		.thoughts;
	const currentThoughtId = useSelector((state: RootState) => state)
		.thoughtsReducer.currentThought;
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
	const [rephrasedDistortions, setRephrasedDistortions] = useState<
		(keyof DISTORTIONS_TYPE)[]
	>([]);
	const [errorMsg, setErrorMsg] = useState('');

	useEffect(() => {
		setOriginal(currentThoughtObj?.original || '');
		setRephrased(currentThoughtObj?.rephrased || '');
	}, [currentThoughtId]);

	useEffect(() => {
		checkDistortionsInText('original', original);
	}, [original]);

	useEffect(() => {
		checkDistortionsInText('rephrased', rephrased);
	}, [rephrased]);

	const keyWords = Object.keys(DISTORTIONS_DICTIONARY);

	function checkDistortionsInText(
		source: 'original' | 'rephrased',
		text: string
	) {
		if (source === 'original') setOriginalDistortions([]);
		if (source === 'rephrased') setRephrasedDistortions([]);

		text.split(' ').forEach((word) => {
			keyWords.forEach((keyWord) => {
				if (keyWord === word) {
					if (source === 'original') {
						DISTORTIONS_DICTIONARY[
							word as keyof DISTORTIONS_DICTIONARY_TYPE
						].forEach((matchedDistortion) => {
							// TODO: check if you can find the currect type for the prevArr action call
							setOriginalDistortions((prevArr: any) => {
								if (
									!prevArr.includes(matchedDistortion as keyof DISTORTIONS_TYPE)
								) {
									return [...prevArr, matchedDistortion];
								} else {
									return prevArr;
								}
							});
						});
					} else if (source === 'rephrased') {
						DISTORTIONS_DICTIONARY[
							word as keyof DISTORTIONS_DICTIONARY_TYPE
						].forEach((matchedDistortion) => {
							// TODO: check if you can find the currect type for the prevArr action call
							setRephrasedDistortions((prevArr: any) => {
								if (
									!prevArr.includes(matchedDistortion as keyof DISTORTIONS_TYPE)
								) {
									return [...prevArr, matchedDistortion];
								} else {
									return prevArr;
								}
							});
						});
					}
				}
			});
		});
	}

	function onOriginalInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		const text = e.target.value;
		setOriginal(text);
	}

	function onRephrasedInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		const text = e.target.value;
		setRephrased(text);
	}

	const formIsValid =
		original !== '' && rephrased !== '' && rephrasedDistortions.length < 1;

	function handleSumbit() {
		console.log('please sumbit form form is valid?', formIsValid);
		if (userLogged && formIsValid) {
			setErrorMsg('');
			const payload = {
				id: currentThoughtId || uuidv4(),
				original,
				rephrased,
				distortions: originalDistortions,
				// TODO: replace this with user data
				createdBy: '332e42332',
				firstName: 'David',
				lastName: 'Shir',
			};
			if (editMode) {
				dispatch(setCurrentThought(''));
				dispatch(editThought(payload));
			} else {
				dispatch(addThought(payload));
			}
		} else {
			setErrorMsg('Please check the form');
		}
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
							value={original}
							onChange={onOriginalInputChange}
						/>
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
							value={rephrased}
							onChange={onRephrasedInputChange}
						/>
						<div className="distortions-tags-container">
							{rephrasedDistortions.length > 0 &&
								rephrasedDistortions.map((distortion) => (
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
