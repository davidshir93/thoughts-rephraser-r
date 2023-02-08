import './App.scss';
import ThoughtForm from './components/ThoughtForm/ThoughtForm';
import ThoughtsList from './components/ThoughtsList/ThoughtsList';

function App() {
	return (
		<div className="App">
			<h1>Every jurney starts with one line of code</h1>
			<ThoughtForm />
			<ThoughtsList />
		</div>
	);
}

export default App;
