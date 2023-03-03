import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
	deleteThought,
	setCurrentThought,
} from '../../features/thoughts/thoughtsSlice';
import { DISTORTIONS_NAMES, TABS_THOGUHT_STATES } from '../../const';
import { IThought } from '../../interfaces';
import Pill from '../design-library/Pill/Pill';
import Tabs from '../design-library/Tabs/Tabs';
import './ThoughtCard.scss';

type ThoughtCardProps = {
	thought: IThought;
};

export default function ThoughtCard({ thought }: ThoughtCardProps) {
	const fullName = `${thought.firstName} ${thought.lastName}`;
	const cardInEditMode =
		useAppSelector((state) => state).thoughts.currentThoughtId === thought.id;
	const editableCard = true;
	const [tabs, setTabs] = useState(TABS_THOGUHT_STATES);
	const [selectedTab, setSelectedTab] = useState('original');

	const dispatch = useAppDispatch();

	function onTabClick(selectedTabName: string) {
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

	let tabContent;
	if (selectedTab === 'original') {
		tabContent = <p className="bold">{thought.original}</p>;
	} else if (selectedTab === 'rephrased') {
		tabContent = <p className="bold">{thought.rephrased}</p>;
	}

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
				{tabContent}

				<div className="distortions-tags-container">
					{thought &&
						thought.distortions &&
						thought.distortions.length > 0 &&
						thought.distortions.map((distortion) => (
							<Pill
								key={distortion}
								label={DISTORTIONS_NAMES[distortion]}
								state="regular"
							/>
						))}
				</div>

				<p className="caption created-by">Created by {fullName}</p>
			</div>
		</>
	);
}
