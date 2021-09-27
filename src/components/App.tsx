import React from 'react';
import logo from './logo.svg';
import './App.css';
import '../services/firebase'
import {useAuthState} from "react-firebase-hooks/auth";

import AuthPageController from "./screen/auth/AuthPageController";
import {auth} from "../services/firebase";

function App() {
  const [user, authLoading] = useAuthState(auth)

  if (!user || authLoading) {
    return <AuthPageController/>
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="#"
          rel="noopener noreferrer"
          onClick={() => auth.signOut()}
        >
          Logout
        </a>
      </header>
    </div>
  );
}

export default App;
