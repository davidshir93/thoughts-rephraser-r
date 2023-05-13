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

export const DISTORTIONS_NAMES_MAP = {
	blackandwhitethinking: 'blackandwhitethinking',
	catastrophizing: 'catastrophizing',
	catastrophization: 'catastrophizing',
	sensationalizing: 'sensationalizing',
	overgeneralization: 'generalization',
	overgeneralizing: 'generalization',
	generalization: 'generalization',
	allornothingthinking: 'allornothingthinking',
	polarizedthinking: 'allornothingthinking',
	polarization: 'allornothingthinking',
	mindreading: 'mindreading',
	personalization: 'personalizing',
	personalizing: 'personalizing',
	emotionalreasoning: 'emotionalreasoning',
	labeling: 'labeling',
	negativefiltering: 'negativefiltering',
	fortunetelling: 'fortunetelling',
	jumpingtoconclusions: 'jumpingtoconclusions',
	rationalization: 'rationalization',
	mentalfiltering: 'mentalfiltering',
	shouldstatements: 'shouldstatements',
	controlfallacies: 'controlfallacies',
};
// ALL
// export type DISTORTIONS_TYPE = {
// 	blackandwhitethinking: string;
// 	catastrophizing: string;
// 	catastrophization: string;
// 	sensationalizing: string;
// 	overgeneralization: string;
// 	generalization: string;
// 	overgeneralizing: string;
// 	allornothingthinking: string;
// 	polarizedthinking: string;
// 	polarization: string;
// 	mindreading: string;
// 	personalization: string;
// 	personalizing: string;
// 	emotionalreasoning: string;
// 	labeling: string;
// 	negativefiltering: string;
// 	fortunetelling: string;
// 	jumpingtoconclusions: string;
// 	rationalization: string;
// 	mentalfiltering: string;
// 	shouldstatements: string;
// 	controlfallacies: string;
// };

// UNIQUE
export type DISTORTIONS_TYPE = {
	blackandwhitethinking: string;
	catastrophizing: string;
	sensationalizing: string;
	generalization: string;
	allornothingthinking: string;
	mindreading: string;
	personalizing: string;
	emotionalreasoning: string;
	labeling: string;
	negativefiltering: string;
	fortunetelling: string;
	jumpingtoconclusions: string;
	rationalization: string;
	mentalfiltering: string;
	shouldstatements: string;
	controlfallacies: string;
};

export const DISTORTIONS_NAMES_AND_DESCRIPTIONS = {
	blackandwhitethinking: {
		title: 'Black and White Thinking',
		description:
			'This distortion manifests as an inability or unwillingness to see shades of gray. In other words, you see things in terms of extremes – something is either fantastic or awful, you believe you are either perfect or a total failure.',
	},
	catastrophizing: {
		title: 'Catastrophizing',
		description:
			'Also known as the “Binocular Trick” for its stealthy skewing of your perspective, this distortion involves exaggerating or minimizing the meaning, importance, or likelihood of things. An athlete who is generally a good player but makes a mistake may magnify the importance of that mistake and believe that he is a terrible teammate, while an athlete who wins a coveted award in her sport may minimize the importance of the award and continue believing that she is only a mediocre player.',
	},
	sensationalizing: {
		title: 'Sensationalizing',
		description:
			'The tendency to exaggerate or focus on the most extreme aspects of a situation, often leading to inaccurate or distorted perceptions of reality.',
	},
	generalization: {
		title: 'Generalization',
		description:
			'This sneaky distortion takes one instance or example and generalizes it to an overall pattern. For example, a student may receive a C on one test and conclude that she is stupid and a failure. Overgeneralizing can lead to overly negative thoughts about yourself and your environment based on only one or two experiences.',
	},
	allornothingthinking: {
		title: 'All-or-Nothing Thinking',
		description:
			'A cognitive distortion in which individuals view situations or people as either completely good or completely bad, with no middle ground or gray areas.',
	},
	mindreading: {
		title: 'Mind Reading',
		description:
			'This “Jumping to Conclusions” distortion manifests as the inaccurate belief that we know what another person is thinking. Of course, it is possible to have an idea of what other people are thinking, but this distortion refers to the negative interpretations that we jump to. Seeing a stranger with an unpleasant expression and jumping to the conclusion that they are thinking something negative about you is an example of this distortion.',
	},
	personalizing: {
		title: 'Personalizing',
		description:
			'As the name implies, this distortion involves taking everything personally or assigning blame to yourself without any logical reason to believe you are to blame. This distortion covers a wide range of situations, from assuming you are the reason a friend did not enjoy the girls’ night out, to the more severe examples of believing that you are the cause for every instance of moodiness or irritation in those around you.',
	},
	emotionalreasoning: {
		title: 'Emotional Reasoning',
		description:
			'Emotional reasoning refers to the acceptance of one’s emotions as fact. It can be described as “I feel it, therefore it must be true.” Just because we feel something doesn’t mean it is true; for example, we may become jealous and think our partner has feelings for someone else, but that doesn’t make it true. Of course, we know it isn’t reasonable to take our feelings as fact, but it is a common distortion nonetheless.',
	},
	labeling: {
		title: 'Labeling',
		description:
			'These tendencies are basically extreme forms of overgeneralization, in which we assign judgments of value to ourselves or to others based on one instance or experience. For example, a student who labels herself as “an utter fool” for failing an assignment is engaging in this distortion, as is the waiter who labels a customer “a grumpy old miser” if he fails to thank the waiter for bringing his food. Mislabeling refers to the application of highly emotional, loaded, and inaccurate or unreasonable language when labeling.',
	},
	negativefiltering: {
		title: 'Negative filtering',
		description:
			'involves selectively focusing on negative aspects of a situation while ignoring positive aspects, leading to a distorted perception of reality.',
	},
	fortunetelling: {
		title: 'Fortune-telling',
		description:
			'A sister distortion to mind reading, fortune telling refers to the tendency to make conclusions and predictions based on little to no evidence and holding them as gospel truth. One example of fortune-telling is a young, single woman predicting that she will never find love or have a committed and happy relationship based only on the fact that she has not found it yet. There is simply no way for her to know how her life will turn out, but she sees this prediction as fact rather than one of several possible outcomes.',
	},
	jumpingtoconclusions: {
		title: 'Jumping to Conclusions',
		description:
			'a cognitive distortion in which individuals make assumptions or draw conclusions about a situation without sufficient evidence or information, often leading to misunderstandings and incorrect judgments.',
	},
	rationalization: {
		title: 'Rationalization',
		description:
			'creating justifications or excuses to explain away or minimize behavior or situations that are actually problematic or harmful.',
	},
	mentalfiltering: {
		title: 'Mental Filtering',
		description:
			'Similar to overgeneralization, the mental filter distortion focuses on a single negative piece of information and excludes all the positive ones. An example of this distortion is one partner in a romantic relationship dwelling on a single negative comment made by the other partner and viewing the relationship as hopelessly lost, while ignoring the years of positive comments and experiences. The mental filter can foster a decidedly pessimistic view of everything around you by focusing only on the negative.',
	},
	shouldstatements: {
		title: 'Should Statements',
		description:
			'Another particularly damaging distortion is the tendency to make “should” statements. Should statements are statements that you make to yourself about what you “should” do, what you “ought” to do, or what you “must” do. They can also be applied to others, imposing a set of expectations that will likely not be met. When we hang on too tightly to our “should” statements about ourselves, the result is often guilt that we cannot live up to them. When we cling to our “should” statements about others, we are generally disappointed by their failure to meet our expectations, leading to anger and resentment.',
	},
	controlfallacies: {
		title: 'Control Fallacies',
		description:
			'A control fallacy manifests as one of two beliefs: (1) that we have no control over our lives and are helpless victims of fate, or (2) that we are in complete control of ourselves and our surroundings, giving us responsibility for the feelings of those around us. Both beliefs are damaging, and both are equally inaccurate. No one is in complete control of what happens to them, and no one has absolutely no control over their situation. Even in extreme situations where an individual seemingly has no choice in what they do or where they go, they still have a certain amount of control over how they approach their situation mentally.',
	},
};
