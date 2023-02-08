export const TABS_THOGUHT_STATES = [
	{
		name: 'original',
		displayName: 'Original',
		state: 'active',
	},
	{
		name: 'rephrased',
		displayName: 'Rephrased',
		state: 'inactive',
	},
];

export const DISTORTIONS_NAMES = {
	blackAndWhiteThinking: 'Black and White Thinking',
	catastrophizing: 'Catastrophizing',
	overgeneralizing: 'Overgeneralizing',
};

export const DISTORTIONS_DICTIONARY = {
	doom: ['catastrophizing', 'overgeneralizing'],
	doomed: ['catastrophizing', 'overgeneralizing'],
	all: ['blackAndWhiteThinking'],
	always: ['blackAndWhiteThinking'],
	never: ['catastrophizing', 'overgeneralizing'],
	test: ['overgeneralizing'],
};
