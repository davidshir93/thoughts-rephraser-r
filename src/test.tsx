import React from 'react';

interface MyObject {
	name: string;
	age: number;
	location: string;
}

const keys: (keyof MyObject)[] = ['name', 'age', 'location'];

const MyComponent: React.FC = () => {
	const object: MyObject = { name: 'John Doe', age: 30, location: 'New York' };

	return (
		<ul>
			{keys.map((key) => (
				<li key={key}>
					{key}: {object[key]}
				</li>
			))}
		</ul>
	);
};

export default MyComponent;
