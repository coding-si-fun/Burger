import React from 'react';
import Aux from '../../../hoc/_Aux/_Aux';
import Button from '../../../components/UI/Button/Button';
const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredientss).map((igKey) => {
        return (React.createElement("li", { key: igKey },
            React.createElement("span", { style: { textTransform: 'capitalize' } }, igKey),
            ": ",
            props.ingredientss[igKey]));
    });
    return (React.createElement(Aux, null,
        React.createElement(React.Fragment, null,
            React.createElement("h3", null, "Your Order"),
            React.createElement("p", null, "Adeliciuos burger with the following ingrediets"),
            React.createElement("ul", null, ingredientSummary),
            React.createElement("p", null,
                "Total Price: ",
                React.createElement("strong", null, props.price.toFixed(2))),
            React.createElement("p", null, "Continue to Checkout?"),
            React.createElement(Button, { btnType: "Danger", clicked: props.purchaseCanceled, disabled: undefined }, "CANCEL"),
            React.createElement(Button, { btnType: "Success", clicked: props.purchaseContinued, disabled: undefined }, "CONTINUE"))));
};
export default orderSummary;
//# sourceMappingURL=orderSummary.js.map