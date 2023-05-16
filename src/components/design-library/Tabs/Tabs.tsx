import './Tabs.scss';

type TabsProps = {
	tabs: Tab[];
	onTabClick: (selectedTabName: string) => void;
};

type Tab = {
	name: string;
	displayName: string;
	state: 'active' | 'inactive';
};

export default function Tabs({ tabs, onTabClick }: TabsProps) {
	return (
		<div className="tabs-container">
			{tabs.map((tab) => (
				<div
					key={tab.name}
					className={`tab caption ${tab.state}`}
					onClick={() => onTabClick(tab.name)}>
					{tab.displayName}
				</div>
			))}
		</div>
	);
}
