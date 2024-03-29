import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';


interface Ingredients {
    salad: number;
    bacon: number;
    cheese: number;
    meat: number;
}

interface Props {
    purchaseCanceled: () => void
    purchaseContinued: () => void
    ingredients: Ingredients
    price: number;
}

const orderSummary: React.FC<Props> = props => {
    // This could be a functional component, doesn't have to be a class
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey as keyof Ingredients]}
                </li>);
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
}


export default orderSummary;