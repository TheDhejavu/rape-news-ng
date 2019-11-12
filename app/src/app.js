import React from "react";
import ReactDOM from "react-dom";
import App from "./scenes";
import { store} from './store';
import { Provider } from "react-redux";
import "./assets/styles/custom.scss";

ReactDOM.render(<App />,document.getElementById("app"));