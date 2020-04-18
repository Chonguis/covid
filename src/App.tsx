import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SymptonChecker from './components/SymptonChecker/SymptonChecker';
import Tracker from './components/Tracker/Tracker';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">SymptonChecker</Link>
            </li>
            <li>
              <Link to="/tracker">Tracker</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={SymptonChecker} />
          <Route exact path="/tracker" component={Tracker} />
          <Route exact path="/about" component={Abouty} />
        </Switch>
      </div>
    </Router>
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Abouty() {
  return <h2>Abouty</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
