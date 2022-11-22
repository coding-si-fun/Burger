import { Dispatch } from "react";
import { AnyAction } from "redux";
import * as actionTypes from "../actions/actionTypes"

interface OrderData {
  orderData:{}
  dispatch:Dispatch<AnyAction>
  error:boolean
  id:string;
  orderId:string
  orders:string[]
  loading:boolean
  }

const initialState = {
  orders: [],
  loading: false,
};

const reducer = (state=initialState, action:{type:string,OrderData:{},orderId:string})=> {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading:true
      }
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.OrderData,
        id:action.orderId
      }
      return {
        ...state,
        loading:false,
        orders:state.orders.concat(newOrder , [] as string[])
      }
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading:false
      }
    default:
      return state;
  }
}

export default reducer