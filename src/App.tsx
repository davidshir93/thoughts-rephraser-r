import './App.scss';
import ThoughtForm from './components/ThoughtForm/ThoughtForm';
import ThoughtsList from './components/ThoughtsList/ThoughtsList';

function App() {
	return (
		<div className="App">
			<h1>Thoughts Rephraser</h1>
			<ThoughtForm />
			<ThoughtsList />
		</div>
	);
}

export default App;
