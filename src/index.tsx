import React from "react";
import { composeWithDevTools } from 'redux-devtools-extension';
// import  ReactDOM  from "react-dom";
import { createRoot } from 'react-dom/client';
import { render } from "react-dom";
import "./index.css";
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import { createStore, applyMiddleware,compose } from 'redux'
import BurgerBuilderReducer from "./containers/store/reducers/BurgerBuilder"
import thunk from "redux-thunk";
import App from './App';

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(BurgerBuilderReducer, composeWithDevTools(applyMiddleware(thunk)));
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