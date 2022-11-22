import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const navigationItems = (props) => (React.createElement("ul", { className: classes.NavigationItems },
    React.createElement(NavigationItem, { exact: true, link: "/" }, "Burger Builder"),
    React.createElement(NavigationItem, { link: "/orders", exact: undefined }, "Orders")));
export default navigationItems;
//# sourceMappingURL=NavigationItems.js.map