import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
const DISABLED_INFO = {
    salad: true,
    cheese: true,
    meat: true,
    bacon: true
};
const controls = [
    { label: 'Salad', type: "salad" },
    { label: 'Beacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];
const buildControls = (props) => (React.createElement("div", { className: classes.BuildControls },
    React.createElement("p", null,
        "Current Price: ",
        React.createElement("strong", null, props.price.toFixed(2))),
    controls.map((ctrl) => (React.createElement(BuildControl, { key: ctrl.label, label: ctrl.label, added: () => props.ingredientAdded(ctrl.type), removed: () => props.ingredientRemoved(ctrl.type), disabled: props.disabled[ctrl.type], price: props.price }))),
    React.createElement("button", { className: classes.OrderButton, disabled: !props.purchasable, onClick: props.ordered }, "ORDER NOW")));
export default buildControls;
//# sourceMappingURL=BuildControls.js.map