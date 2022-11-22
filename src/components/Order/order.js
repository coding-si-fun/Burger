import React from 'react';
import classes from './Order.css';
const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }
    const ingredientOutput = ingredients.map(ig => {
        return React.createElement("span", { style: {
                textTransform: "capitalize",
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }, key: ig.name },
            ig.name,
            " (",
            ig.amount,
            ")");
    });
    return (React.createElement("div", { className: classes.Order },
        React.createElement("p", null,
            "Ingredients:",
            ingredientOutput,
            ")"),
        React.createElement("p", null,
            "Price:",
            React.createElement("strong", null,
                "USD price=",
                Number.parseFloat(props.price).toFixed(2)))));
};
export default order;
//# sourceMappingURL=order.js.map