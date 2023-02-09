import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteThought,
	setCurrentThought,
} from '../../redux/actions/thoughtsActions';
import { DISTORTIONS_NAMES, TABS_THOGUHT_STATES } from '../../const';
import { IThought } from '../../interfaces';
import Pill from '../Pill/Pill';
import Tabs from '../Tabs/Tabs';
import './ThoughtCard.scss';
import { RootState } from '../../redux/store';

type ThoughtCardProps = {
	thought: IThought;
};

export default function ThoughtCard({ thought }: ThoughtCardProps) {
	const fullName = `${thought.firstName} ${thought.lastName}`;
	const cardInEditMode =
		useSelector((state: RootState) => state).thoughtsReducer.currentThought ===
		thought.id;
	const editableCard = true;
	const [tabs, setTabs] = useState(TABS_THOGUHT_STATES);
	const [selectedTab, setSelectedTab] = useState('original');

	const dispatch = useDispatch();

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
		console.log('deleting thought with the id of: ' + thought.id);
		dispatch(deleteThought(thought.id));
	}

	function editThought() {
		console.log(
			'setting thought with the id of ' +
				thought.id +
				' to be the current thought'
		);
		dispatch(setCurrentThought(thought.id));
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
					{thought.distortions.length > 0 &&
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
