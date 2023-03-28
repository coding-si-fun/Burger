import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

interface Props {
    ingredients: {
        salad: string | number,
        cheese: string | number,
        bacon: string | number,
        meat: string | number,
    }
}

interface Ingredients {
    salad: number;
    bacon: number;
    cheese: number;
    meat: number;
}

const burger: React.FC<Props> = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey as keyof Ingredients])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedIngredients.length === 0) {
        const str = <p>Pease start adding ingredients! </p>
        transformedIngredients.push(str)
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;