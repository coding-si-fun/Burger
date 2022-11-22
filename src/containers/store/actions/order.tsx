import * as actionType from "../actions/actionTypes"
import axios from "../../../axios-orders"
import { AnyAction, Dispatch } from "redux"

export interface OrderData {
    orderData:{}
    dispatch:Dispatch<AnyAction>
    error:boolean
}

export const purchaseBurgerSuccess=(id: number, orderData: OrderData)=> {
    return {
        type:actionType.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        order:orderData
    }

}

export const purchaseBurgerFail=(error:string)=>{
    return {
        type:actionType.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const purchaseBurgerStart = () => {
    dispatch(purchaseBurgerStart())
    return {
        type:actionType.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData:OrderData) => {
    return (dispatch:Dispatch<AnyAction>) => {
        // dispatch(purchaseBurgerStart())
        axios.post( '/orders.json', orderData )
        .then( (response) => {
          dispatch(purchaseBurgerSuccess(response.data, orderData));
        } )
        .catch( (error) => {
           dispatch(purchaseBurgerFail(error))
        } );
        }
        
    }


function dispatch(arg0: { type: string }) {
    throw new Error("Function not implemented.")
}

