import React from "react";
import classes from './Burger.css';
import BurgerIngredient from "./BurgerIngrediant/BurgerIngrediant";
const Burger = (props, igKey) => {
    console.log("this is props", props);
    let transformedIngredients = Object.keys(props.ingredients).map((igKey) => {
        console.log('ddd', ...Array(props.ingredients[igKey]));
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return React.createElement(BurgerIngredient, { key: igKey + i, type: igKey });
        });
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);
    if (transformedIngredients.length === 0) {
        const str = React.createElement("p", { key: Math.random() }, "Please start adding ingredients! ");
        transformedIngredients.push(str);
    }
    return (React.createElement("div", { className: classes.Burger },
        React.createElement(React.Fragment, null,
            React.createElement(BurgerIngredient, { type: "bread-top" }),
            transformedIngredients,
            React.createElement(BurgerIngredient, { type: "bread-bottom" }))));
};
export default Burger;
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
//# sourceMappingURL=Burger.js.map