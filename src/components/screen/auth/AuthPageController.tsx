import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ResetPasswordPage from "./ResetPasswordPage";

export const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// Uppercase, lowercase, number, symbol, 8 digits
export const STRONG_PWD_REGEX = /^(?=.*?[A-Z])(?=(.*[a-z])+)(?=(.*[\d])+)(?=(.*[\W])+)(?!.*\s).{8,}$/

// Letter, number, 8 digit
export const WEAK_PWD_REGEX = /^(?=.*?[A-Za-z])(?=(.*[\d])+)(?!.*\s).{8,}$/



export default function AuthPageController() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage}/>
        <Route exact path="/register" component={RegisterPage}/>
        <Route exact path="/reset" component={ResetPasswordPage}/>
      </Switch>
    </BrowserRouter>
  )
}
