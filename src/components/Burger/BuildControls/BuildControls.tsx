import React, { createElement, MouseEventHandler } from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
import BurgerIngredient from '../BurgerIngrediant/BurgerIngrediant';

interface Props {
    ordered: MouseEventHandler<HTMLButtonElement> | undefined;
  
    // disabled: any;
    ingredientAdded(type: string): void;
    ingredientRemoved(type: string): void;
    // ordered: MouseEventHandler<HTMLButtonElement> | undefined;
    purchasable:boolean;
    //onClick: React. MouseEvent<HTMLButtonElement, MouseEvent>
    price:number
    disabled:DisabledInfo
}



interface Ingredients {
    salad:string;
    bacon:string;
    meat:string;
    cheese:string;
    
}
interface DisabledInfo {
    salad: boolean,
    cheese: boolean,
    meat: boolean,
    bacon: boolean,
    
  }

const DISABLED_INFO: DisabledInfo = {
    salad:true,
    cheese:true,
    meat:true,
    bacon:true
  }
  

const controls = [
    {label:'Salad', type:"salad"},
    {label:'Beacon', type:'bacon'},
    {label:'Cheese', type:'cheese'} ,
    {label:'Meat', type:'meat'},
]

const buildControls:React.FC<Props> = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        { controls.map((ctrl)=> (
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            added ={()=>props.ingredientAdded(ctrl.type )}
            removed={()=>props.ingredientRemoved(ctrl.type)}
            disabled= { props.disabled[ctrl.type as keyof Ingredients]}
            
            price={props.price}
             />
        ))}
        
          <button className={classes.OrderButton}
          disabled={!props.purchasable}
          onClick={props.ordered}>ORDER NOW</button>
    </div>
)

export default buildControls