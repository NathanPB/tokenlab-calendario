import React from 'react';
import logo from './logo.svg';
import './App.css';
import '../services/firebase'
import {useAuthState} from "react-firebase-hooks/auth";

import AuthPageController from "./screen/auth/AuthPageController";
import HomeScreen from './screen/HomeScreen';

import {auth} from "../services/firebase";
import {BrowserRouter, Route, Switch} from "react-router-dom";

function App() {
  const [user, authLoading] = useAuthState(auth)

  if (!user || authLoading) {
    return <AuthPageController/>
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomeScreen} exact/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
