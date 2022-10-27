import React from 'react';
import Aux from '../../../hoc/Aux'

import { urgerBuilderState} from "../../../containers/BurgerBuilder/BurgerBuilder"

const orderSummary:React.FC<urgerBuilderState>=(props)=>{
    const ingredientSummary=Object.keys(props.ingredients).map(igKey=>{
        return (

        <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>)
    })
    return (
        <Aux>
        <h3>Your Order</h3>
        <p>Adeliciuos burger with the following ingrediets</p>
        <ul>
        {ingredientSummary}
        </ul>
        <p>Continue to Checkout?</p>
        </Aux>
    )
};
export default orderSummary