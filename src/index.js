import React from "react";
import { composeWithDevTools } from 'redux-devtools-extension';
// import  ReactDOM  from "react-dom";
import { createRoot } from 'react-dom/client';
import "./index.css";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import BurgerBuilderReducer from "./containers/store/reducers/BurgerBuilder";
import thunk from "redux-thunk";
import App from './App';
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(BurgerBuilderReducer, composeWithDevTools(applyMiddleware(thunk)));
// console.log((windows as any).hello())
const app = (React.createElement(Provider, { store: store },
    React.createElement(BrowserRouter, null,
        React.createElement(App, null))));
const container = document.getElementById("root");
const root = createRoot(container);
root.render(app);
//# sourceMappingURL=index.js.map