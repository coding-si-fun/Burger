import { AnyAction, bindActionCreators } from "redux";
import * as actionType from "../actions/actionTypes"

interface UserControls {
  ingredients:{}
  totalPrice:number
  error:boolean
}
const INGREDIENT_PRICES = {
  salad:0.5,
  cheese:0.4,
  meat:1,
  bacon:2
}


const initialState:UserControls = {
  ingredients:0,
  totalPrice:2,
  error:false,
}


const reducer = (state: UserControls = initialState, action: AnyAction)=>{
  switch(action.type){
    case actionType.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]:state.ingredients[action.ingredientName as keyof typeof state.ingredients] + 1 
        },
        totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName as keyof typeof state.ingredients]
      }
      case actionType.REMOVE_INGREDIENTS:
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingredientName]:state.ingredients[action.ingredientName as keyof typeof state.ingredients] - 1 
          },
          totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName as keyof typeof state.ingredients]
        }
        case actionType.SET_INGREDIENTS:
          return {
            ...state,
            ingredients:{
              salad:action.ingredients.salad,
              bacon:action.ingredients.bacon,
              cheese:action.ingredients.cheese,
              meat:action.ingredients.meat,
            },
            error:false,
            totalPrice:4,
          }
        case actionType.FETCH_INGREDIENTS_FAILD:
          return {
            ...state,
            error:true
          }
        default:
          return state
  }
 
}

export default reducer
