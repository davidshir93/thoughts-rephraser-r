import { useCallback, useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
	deleteThought,
	setCurrentThought,
} from '../../features/thoughts/thoughtsSlice';
import {
	DISTORTIONS_NAMES_AND_DESCRIPTIONS,
	DISTORTIONS_TYPE,
	TABS_THOUGHT_STATES,
} from '../../const';
import { IThought } from '../../interfaces';
import Pill from '../design-library/Pill/Pill';
import Tabs from '../design-library/Tabs/Tabs';
import { setDistortion } from '../../features/distortion/distortionSlice';
import './ThoughtCard.scss';

type ThoughtCardProps = {
	thought: IThought;
};

export default function ThoughtCard({ thought }: ThoughtCardProps) {
	const fullName = `${thought.firstName} ${thought.lastName}`;
	const cardInEditMode =
		useAppSelector((state) => state).thoughts.currentThoughtId === thought.id;

	const user = useAppSelector((state) => state.user.user);
	const editableCard = user ? thought.createdBy === user.uid : false;
	const [tabs, setTabs] = useState(TABS_THOUGHT_STATES);
	const [selectedTab, setSelectedTab] = useState(TABS_THOUGHT_STATES[0].name);

	const dispatch = useAppDispatch();

	function onTabClick(selectedTabName: typeof selectedTab) {
		setTabs((prevTabs) => {
			return prevTabs.map((tab) => {
				if (tab.name === selectedTabName) {
					return { ...tab, state: 'active' };
				} else {
					return { ...tab, state: 'inactive' };
				}
			});
		});
		setSelectedTab(selectedTabName);
	}

	function handleDeleteThought() {
		dispatch(deleteThought(thought.id || ''));
	}

	function editThought() {
		dispatch(setCurrentThought(thought.id || ''));
	}

	const tabContent = useMemo(() => {
		if (selectedTab === TABS_THOUGHT_STATES[0].name) {
			return thought.original;
		} else if (selectedTab === TABS_THOUGHT_STATES[1].name) {
			return thought.rephrased;
		}
	}, [selectedTab, thought]);

	const handleDistortionClick = useCallback(
		(distortion: keyof DISTORTIONS_TYPE) => {
			dispatch(setDistortion(distortion));
		},
		[thought.distortions]
	);

	const distortionPills = useMemo(() => {
		return (
			thought?.distortions?.length > 0 &&
			thought.distortions.map((distortion) => (
				<div key={distortion} className="pill-container">
					<Pill
						label={DISTORTIONS_NAMES_AND_DESCRIPTIONS[distortion].title}
						state="regular"
						onClick={() => handleDistortionClick(distortion)}
					/>
				</div>
			))
		);
	}, [thought.distortions]);

	return (
		<>
			<div className={`thought-card ${cardInEditMode && 'edit-mode'}`}>
				{editableCard && (
					<div className="editing-icons-container">
						<i className="material-icons" onClick={handleDeleteThought}>
							delete
						</i>
						<i className="material-icons" onClick={editThought}>
							edit
						</i>
					</div>
				)}
				<Tabs tabs={tabs} onTabClick={onTabClick} />
				<p className="bold">{tabContent}</p>

				<div className="distortions-tags-container">{distortionPills}</div>

				<p className="caption created-by">Created by {fullName}</p>
			</div>
		</>
	);
}
