import logo from './logo.svg';
import './App.css';

function App() {
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
     
      <script src="/__/firebase/8.6.5/firebase-app.js"></script>

  
      <script src="/__/firebase/8.6.5/firebase-analytics.js"></script>

      
      <script src="/__/firebase/init.js"></script>
    </div>
  );
}

export default App;
