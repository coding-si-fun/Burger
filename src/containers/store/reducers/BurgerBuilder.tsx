import { AnyAction, bindActionCreators, Dispatch } from "redux";
import * as actionType from "../actions/actionTypes"
import {updatedObject} from "../utility"

interface UserControls {
  ingredients:{}
  totalPrice:number
  error:boolean
  loading:boolean
}
const INGREDIENT_PRICES = {
  salad:0.5,
  cheese:0.4,
  meat:1,
  bacon:2
}


const initialState:UserControls = {
  ingredients:0,
  totalPrice:4,
  error:false,
  loading:false
}

const addIngredient=(state:UserControls, action:{ingredientName:string})=>{
  const updatedIngredient = {  [action.ingredientName]:state.ingredients[action.ingredientName as keyof typeof state.ingredients] + 1 }
  const updatedIngredients = updatedObject(state.ingredients, updatedIngredient)
  const updatedState = { ingredients: updatedIngredients,
    totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName as keyof typeof state.ingredients]}
  return updatedObject(state, updatedState)
}

const removeIngredients =(state:UserControls, action:{ingredientName:string})=> {
  const updatedIng = {  [action.ingredientName]:state.ingredients[action.ingredientName as keyof typeof state.ingredients] - 1 }
  const updatedIngs = updatedObject(state.ingredients, updatedIng)
  const updatedSt = { 
    ingredients: updatedIngs,
    totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName as keyof typeof state.ingredients]}
  return updatedObject(state, updatedSt)
}

const setIngredients = (state:UserControls, action:{
  ingredients:{
    salad:string,
    bacon:string,
    cheese:string,
    meat:string
  }})=> {
  return  updatedObject(state,{
        
    ingredients:{
      salad:action.ingredients.salad,
      bacon:action.ingredients.bacon,
      cheese:action.ingredients.cheese,
      meat:action.ingredients.meat,
    },
    error:false,
    totalPrice:4,
  });
}

const fetchIngredientsFailed = (state:UserControls,)=> {
  return updatedObject(state, {error:true})
}

const reducer = (state: UserControls = initialState, action:{ingredientName:string, ingredients:{
  salad:string,
  bacon:string,
  cheese:string,
  meat:string
},type:string})=>{
  switch(action.type){ 
    case actionType.ADD_INGREDIENTS: return addIngredient(state, action)
    case actionType.REMOVE_INGREDIENTS: return removeIngredients(state, action)    
    case actionType.SET_INGREDIENTS: return setIngredients(state, action)
    case actionType.FETCH_INGREDIENTS_FAILD: return updatedObject(state, {error:true})
    default: return state
  }
 
}

export default reducer
