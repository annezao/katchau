import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

import Parse from 'parse';
import App from 'main/App.js'

Parse.initialize(
  'dCWyq9O4ARD5iUXlGoaVfNl0OQPiy4pwf9ZeWYus',
  '3de4AXkpA8hePqpO106I5rRvDLz0juWPeyCdyjOJ');
Parse.serverURL = "https://katchau-sos.back4app.io";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
