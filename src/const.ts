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

export type DISTORTIONS_TYPE = {
	blackAndWhiteThinking: string;
	catastrophizing: string;
	overgeneralizing: string;
};

export const DISTORTIONS_DICTIONARY = {
	doom: ['catastrophizing', 'overgeneralizing'],
	doomed: ['catastrophizing', 'overgeneralizing'],
	all: ['blackAndWhiteThinking'],
	always: ['blackAndWhiteThinking'],
	never: ['catastrophizing', 'overgeneralizing'],
	test: ['overgeneralizing'],
};

export type DISTORTIONS_DICTIONARY_TYPE = {
	doom: string[];
	doomed: string[];
	all: string[];
	always: string[];
	never: string[];
	test: string[];
};
