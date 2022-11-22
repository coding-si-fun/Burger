import React from "react";
import Logo from "../../Logo/logo";
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from "./sideDrawer.css";
import Backdrop from "../../UI/Modal/Backdrop/Backdrop";
import Aux from '../../../hoc/_Aux/_Aux';
const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (React.createElement(Aux, null,
        React.createElement(React.Fragment, null,
            React.createElement(Backdrop, { show: props.open, clicked: props.closed }),
            React.createElement("div", { className: attachedClasses.join(' ') },
                React.createElement("div", { className: classes.LogoSide },
                    React.createElement(Logo, null)),
                React.createElement("nav", null,
                    React.createElement(NavigationItems, null))))));
};
export default sideDrawer;
//# sourceMappingURL=SideDrawer.js.map