import React, { MouseEventHandler } from "react";

import Burger from "../../Burger/Burger"
import Button from "../../UI//Button/Button"
import classes from'./CheckoutSummary.css'
import {Ingredients} from "../../../containers/BurgerBuilder/BurgerBuilder"

interface Props{
    ingredientss:{}
    checkoutContinued: MouseEventHandler<HTMLButtonElement> | undefined;
    checkoutCancelled: MouseEventHandler<HTMLButtonElement> | undefined;
   
}

const checkoutSummary:React.FC<Props> = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>I hope it tastes well</h1>
            <div style={{ width:"100%", height:"300px", margin:"auto"}}>
            <Burger ingredients={props.ingredientss}/>
            </div>
            <Button 
                btnType="Danger"
                clicked={props.checkoutCancelled} disabled={undefined}>CANCEL</Button>
            <Button 
                btnType="Success"
                clicked={props.checkoutContinued} disabled={undefined}>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary;