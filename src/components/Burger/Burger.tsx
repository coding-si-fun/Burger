import React from "react";

import classes from './Burger.css';
import BurgerIngredient from "./BurgerIngrediant/BurgerIngrediant";
// import BurgerBuilder from "../BurgerBuilder/BurgerBuilder";
import { checkPropTypes } from "prop-types";


interface Props{
    ingredients:{
        salad?:string | number,
        cheese?:string | number,
        bacon?:string | number,
        meat?:string | number,
    }
}

interface Ingredients {
    salad:number;
    bacon:number;
    cheese:number;
    meat:number;
}

const Burger:React.FC <Props>= (props, igKey) => {
    console.log("this is props",props)
    let transformedIngredients = Object.keys(props.ingredients).map((igKey)=>{
        console.log('ddd',...Array(props.ingredients[igKey as keyof Ingredients]))
        return [...Array(props.ingredients[igKey as keyof Ingredients])].map((_, i:number) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    }).reduce((arr, el)=>{
        return arr.concat(el)
    },[]);
    if (transformedIngredients.length === 0) {
        const str=<p key={Math.random()}>Please start adding ingredients! </p>
        transformedIngredients.push(str)
    }
    return (
        
        <div className={classes.Burger}>
        <>
        <BurgerIngredient type="bread-top" />
        { transformedIngredients } 
        <BurgerIngredient type="bread-bottom" /> 
        </>
        </div>
      
    )
}

export default Burger

// const Burger:React.FC <Props>= ({ingredients}, igKey) => {
//     let transformedIngredients = Object.keys(ingredients).map((igKey)=>{
//         console.log('ddd',...Array(ingredients[igKey as keyof Ingredients]))
//         return [...Array(ingredients[igKey as keyof Ingredients])].map((_, i:number) => {
//             return <BurgerIngredient key={igKey + i} type={igKey} />
//         });
//     }).reduce((arr, el)=>{
//         return arr.concat(el)
//     },[]);
//     if (transformedIngredients.length === 0) {
//         const str=<p key={Math.random()}>Please start adding ingredients! </p>
//         transformedIngredients.push(str)
//     }
//     return (
        
//         <div className={classes.Burger}>
//         <>
//         <BurgerIngredient type="bread-top" />
//         { transformedIngredients } 
//         <BurgerIngredient type="bread-bottom" /> 
//         </>
//         </div>
      
//     )
// }
