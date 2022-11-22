import React from "react";
import classes from './BuildControl.css';
const buildControl = (props) => (React.createElement("div", { className: classes.BuildControl },
    React.createElement("div", { className: classes.Label }, props.label),
    React.createElement("button", { className: classes.Less, onClick: props.removed, disabled: props.disabled }, "Less"),
    React.createElement("button", { className: classes.More, onClick: props.added }, "More")));
export default buildControl;
//# sourceMappingURL=BuildControl.js.map