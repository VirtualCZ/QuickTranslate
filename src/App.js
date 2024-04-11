import logo from './logo.svg';
import './App.css';
import { translate } from '@vitalets/google-translate-api';
const { text } = await translate('Привет, мир! Как дела?', { to: 'pl' });

function App() {
  console.log("pikarina")

console.log(text) // => 'Hello World! How are you?'
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
