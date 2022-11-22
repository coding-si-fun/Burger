import { AnyAction, bindActionCreators } from "redux";
import * as actionType from "../store/actions/actionTypes"

interface UserControls {
  ingredients:{}
  totalPrice:number
}
const INGREDIENT_PRICES = {
  salad:0.5,
  cheese:0.4,
  meat:1,
  bacon:2
}


const initialState:UserControls = {
  ingredients:{
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
      },
  totalPrice:4,
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
        default:
          return state
  }
 
}

export default reducer

// state : {
//   ingredients:{
//     salad:0,
//     bacon:0,
//     cheese:0,
//     meat:0
//   },
//   totalPrice:4,
// }