import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

import Parse from 'parse';
import App from 'main/App.js'

Parse.initialize(
  'PVBDcZz4pgQKtd4ENcNb4cfMEx4lnNybkR7zGkdf',
  'S9taD9jpvpUbdXqeoPFPoxhU23QpFGNt2lyPADDu');
Parse.serverURL = "https://katchau.back4app.io";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
