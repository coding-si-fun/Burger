import { Dispatch } from "react";
import { AnyAction } from "redux";
import * as actionTypes from "../actions/actionTypes"
import { updatedObject } from '../utility'

interface OrderData {
  orderData: {}
  dispatch: Dispatch<AnyAction>
  error: boolean
  id: string;
  orderId: string
  orders: string[]
  loading: boolean
}

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

interface initialState {
  orders: string[],
  loading: boolean,
  purchased: boolean
}

const PurchaseInit = (state: initialState = initialState, action: AnyAction) => {
  return updatedObject(state, { purchased: false })
}

const purchaseBurgerStart = (state: initialState, action: AnyAction) => {
  return updatedObject(state, { loading: true })
}
const purchaseBurgerSuccess = (state: initialState, action: AnyAction) => {
  const newOrder = updatedObject(action.orderData, { id: action.orderId })
  return updatedObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  })
}

const purchaseBurgerFail = (state: initialState, action: AnyAction) => {
  return updatedObject(state, { laoding: false })
}
const fetchOrdersStart = (state: initialState, action: AnyAction) => {
  return updatedObject(state, { laoding: true })
}
const fetchOrdersSuccess = (state: initialState, action: AnyAction) => {
  return updatedObject(state, {
    orders: action.orders,
    loading: false
  })
}

const fetchOrdersFail = (state: initialState, action: AnyAction) => {
  return updatedObject(state, { loading: false })
}

const reducer = (state: initialState = initialState, action: {
  type: string
}) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT: return PurchaseInit(state, action)
    case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action)
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
    case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action)
    case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action)
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action)
    case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action)
    default: return state;
  }
}

export default reducer