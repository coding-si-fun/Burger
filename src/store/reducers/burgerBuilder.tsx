import { Ingredients } from '../../containers/Checkout/ContactData/ContactData';
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../containers/shared/utility';



const initialState = {
    ingredients: {} as Ingredients,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};
type IngredientName = "salad" | "bacon" | "cheese" | "meat"


interface addIngriedinetsTA {
    type: typeof actionTypes.ADD_INGREDIENT
    ingredientName: IngredientName
}

interface removeIngriedinetsTA {
    type: typeof actionTypes.REMOVE_INGREDIENT
    ingredientName: IngredientName
}

type setIngredientsTA = {
    type: typeof actionTypes.SET_INGREDIENTS;
    ingredients: Ingredients;
};

type fetchIngredientsTA = {
    type: typeof actionTypes.FETCH_INGREDIENTS_FAILED;
    ingredients: Ingredients;
};

type AllActionsforReducer = addIngriedinetsTA | removeIngriedinetsTA | setIngredientsTA | fetchIngredientsTA


const addIngredient = (state: typeof initialState, action: addIngriedinetsTA) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
};

const removeIngredient = (state: typeof initialState, action: removeIngriedinetsTA) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedSt);
};

const setIngredients = (state: typeof initialState, action: setIngredientsTA) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    });
};

const fetchIngredientsFailed = (state: typeof initialState, action: fetchIngredientsTA) => {
    return updateObject(state, { error: true });
};

const reducer = (state = initialState, action: AllActionsforReducer) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
};

export default reducer;