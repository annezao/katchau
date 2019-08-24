import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

import Parse from 'parse';
import App from 'main/App.js'

Parse.initialize(
  'H5dcONjNMNy5WTpFt9tXAHdEAeanqT8mlq9HRSPu',
  'WPnfXA7fjUYszyhf8SuEkcKR8X0LyRTEL6TrodJZ');
Parse.serverURL = "https://katchau-dev.back4app.io";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
