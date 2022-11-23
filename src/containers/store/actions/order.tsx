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
    // dispatch(purchaseBurgerStart())
    return {
        type:actionType.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData:OrderData) => {
    return (dispatch:Dispatch<AnyAction>) =>{
        dispatch(purchaseBurgerStart())
            //Here I had an order data  as a second argument on 'order.json, orderData
        axios.post( '/orders.json')
        .then( (response) => {
          dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        } )
        .catch( (error) => {
           dispatch(purchaseBurgerFail(error))
        } );
        }
        
    }

export const fetchOrdersSuccess =(orders) => {
    return {
        type:actionType.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}


export const purchaseInit = () => {
    return {
        type:actionType.PURCHASE_INIT
    }
}

export const fetchOrdersFail = (error:string) => {
    return {
        type:actionType.FETCH_ORDERS_FAIL,
        error:error
    }
}

export const fetchOrdersStart = () => {
    return {
        type:actionType.FETCH_ORDERS_START

    }
}

export const fetchOrders = () => {
   return (dispatch: (arg0: { type: string; orders?: string[]; error?: string }) => {}) => {
    dispatch(fetchOrdersStart())
    axios.get('orders.json')
    .then((res) => {
        const fetchedOrders=[];
        for(let key in res.data ){
            fetchedOrders.push({
                ...res.data[key],
                id:key
            })
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
    }).catch( (err:string) => {
       dispatch(fetchOrdersFail(err))
    })
   }
    }
