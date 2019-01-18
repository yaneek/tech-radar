import React from "react";
import ReactDOM from "react-dom";

import FilterContainer from "./components/FilterContainer.jsx";
import {redrawRadar} from './radar-actions';

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<FilterContainer />, wrapper) : false;

redrawRadar();
