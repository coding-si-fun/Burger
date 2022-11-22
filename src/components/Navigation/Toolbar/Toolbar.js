import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/logo";
import NavigationItems from "../../Navigation/NavigationItems/NavigationItems";
import DrawerToggle from '../SideDrawer/DrawerToggle/toggle';
const toolbar = (props) => {
    return (React.createElement("header", { className: classes.Toolbar },
        React.createElement(DrawerToggle, { clicked: props.drawerToggleClicked }),
        React.createElement("div", { className: classes.Logo },
            React.createElement(Logo, null)),
        React.createElement("nav", { className: classes.DesktopOnly },
            React.createElement(NavigationItems, null))));
};
export default toolbar;
//# sourceMappingURL=Toolbar.js.map