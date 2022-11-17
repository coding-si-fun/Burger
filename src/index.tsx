import React from "react";
// import  ReactDOM  from "react-dom";
import { createRoot } from 'react-dom/client';
import { render } from "react-dom";
import "./index.css";
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import { createStore } from 'redux'
import reducer from "./containers/store/reducer"
import App from './App';

const store = createStore(reducer)
// console.log((windows as any).hello())
const app=(
    <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>
);
const container = document.getElementById("root")
const root= createRoot(container!)
root.render(app)