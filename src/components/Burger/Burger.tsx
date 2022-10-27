import React from "react";

import classes from './Burger.css';
import BurgerIngredient from "./BurgerIngrediant/BurgerIngrediant";
// import BurgerBuilder from "../BurgerBuilder/BurgerBuilder";
import { checkPropTypes } from "prop-types";


interface Props{
    ingredients:{
        salad:string | number,
        cheese:string | number,
        bacon:string | number,
        meat:string | number,
    }
}

const Burger:React.FC <Props>= ({ingredients}, igKey) => {
    let transformedIngredients = Object.keys(ingredients).map((igKey)=>{
        return [...Array(ingredients[igKey])].map((_, i:number) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    }).reduce((arr, el)=>{
        return arr.concat(el)
    },[]);
    if (transformedIngredients.length === 0) {
        const str=<p>Pease start adding ingredients! </p>
        transformedIngredients.push(str)
    }
    return (
        <div className={classes.Burger}>
        <BurgerIngredient type="bread-top" />
        { transformedIngredients } 
        <BurgerIngredient type="bread-bottom" /> 
        </div>
    )
}

export default Burger
