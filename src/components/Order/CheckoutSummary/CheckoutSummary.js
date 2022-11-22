import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI//Button/Button";
import classes from './CheckoutSummary.css';
const checkoutSummary = (props) => {
    return (React.createElement("div", { className: classes.CheckoutSummary },
        React.createElement("h1", null, "I hope it tastes well"),
        React.createElement("div", { style: { width: "100%", height: "300px", margin: "auto" } },
            React.createElement(Burger, { ingredients: props.ingredientss })),
        React.createElement(Button, { btnType: "Danger", clicked: props.checkoutCancelled, disabled: undefined }, "CANCEL"),
        React.createElement(Button, { btnType: "Success", clicked: props.checkoutContinued, disabled: undefined }, "CONTINUE")));
};
export default checkoutSummary;
//# sourceMappingURL=CheckoutSummary.js.map