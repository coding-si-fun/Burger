import React from "react";

import classes from "./NavigationItems.css"
import NavigationItem from "./NavigationItem/NavigationItem"




const navigationItems: React.FC = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link="/">Burger Builder</NavigationItem>
        <NavigationItem link="/orders" exact={undefined} >Orders</NavigationItem>
        <NavigationItem link="/auth" >Authenticate</NavigationItem>
    </ul>
);

export default navigationItems