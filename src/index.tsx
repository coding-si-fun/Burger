import React from "react";
// import  ReactDOM  from "react-dom";
import { createRoot } from 'react-dom/client';
import { render } from "react-dom";
import "./index.css";
import App from './App';


// console.log((windows as any).hello())

const container = document.getElementById("root")
const root= createRoot(container!)
root.render(<App />)