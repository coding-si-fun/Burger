import * as actionTypes from './actionTypes';
import axios from "../../../axios-orders";
export const addIngredient = (Name) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: Name
    };
};
export const removeIngredient = (Name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: Name
    };
};
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILD
    };
};
export const initIngredients = () => {
    return (dispatch) => {
        axios.get('https://burger-12c1d-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
            .then((response) => {
            console.log(response.data);
            dispatch(setIngredients(response.data));
        })
            .catch((error) => {
            dispatch(fetchIngredientsFailed());
        });
    };
};
//# sourceMappingURL=burgerBuilder.js.map