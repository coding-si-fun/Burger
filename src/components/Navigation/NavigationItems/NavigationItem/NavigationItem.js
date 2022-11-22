import React from "react";
import { NavLink } from 'react-router-dom';
import classes from "./navigationItem.css";
const navigationItem = (props) => (React.createElement("li", { className: classes.NavigationItem },
    React.createElement(NavLink, { to: props.link, exact: props.exact, activeClassName: classes.active }, props.children)));
export default navigationItem;
//# sourceMappingURL=NavigationItem.js.map