import React, { MouseEventHandler, ReactElement } from 'react';
import Aux from '../../../hoc/_Aux/_Aux'
import Button from '../../../components/UI/Button/Button'

import { BurgerBuilderState} from "../../../containers/BurgerBuilder/BurgerBuilder"

interface Props {
purchaseCanceled:()=>void
purchaseContinued:()=>void
ingredientss:Ingredients
price:number;
}

interface Ingredients {
    salad:number;
    bacon:number;
    cheese:number;
    meat:number;
}



const orderSummary:React.FC<Props>=(props)=>{
    const ingredientSummary=Object.keys(props.ingredientss).map((igKey)=>{
            return (
            <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredientss[igKey as keyof Ingredients]}</li>)
        })

    return (
        <Aux>
            <>
            <h3>Your Order</h3>
            <p>Adeliciuos burger with the following ingrediets</p>
            <ul>
            {ingredientSummary}
            </ul>
            <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled} disabled={undefined} >CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued} disabled={undefined}>CONTINUE</Button>
            </>
        </Aux>
    )
};
export default orderSummary
