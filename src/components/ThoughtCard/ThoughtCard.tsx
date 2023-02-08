import { useState } from 'react';
import { DISTORTIONS_NAMES, TABS_THOGUHT_STATES } from '../../const';
import { IThought } from '../../interfaces';
import Pill from '../Pill/Pill';
import Tabs from '../Tabs/Tabs';
import './ThoughtCard.scss';

type ThoughtCardProps = {
	thought: IThought;
};

export default function ThoughtCard({ thought }: ThoughtCardProps) {
	const fullName = `${thought.firstName} ${thought.lastName}`;
	const cardInEditMode = false;
	const editableCard = true;
	const [tabs, setTabs] = useState(TABS_THOGUHT_STATES);
	const [selectedTab, setSelectedTab] = useState('original');

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

	function deleteThought() {
		console.log('please delete ' + thought.id);
	}

	function editThought() {
		console.log('please edit ' + thought.id);
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
						<i className="material-icons" onClick={deleteThought}>
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
