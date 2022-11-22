import React from "react";
import classes from "./Button.css";
const Buttons = (props) => {
    return (React.createElement("button", { disabled: props.disabled, className: [classes.Button, classes[props.btnType]].join(' '), onClick: props.clicked }, props.children));
};
export default Buttons;
//# sourceMappingURL=Button.js.map