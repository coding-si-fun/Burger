import * as actionTypes from '../actions/actionTypes';
import { forOrder } from '../actions/order';
import { updateObject } from '../../containers/shared/utility';

const initialState = {
    orders: [] as forOrder[],
    loading: false,
    purchased: false
};

interface ActionsforOrfersTypes {
    type: keyof typeof actionTypes
    orderData: forOrder;
    orders: forOrder[]
    orderId: string;
}

const purchaseInit = (state: typeof initialState, action: ActionsforOrfersTypes) => {
    return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = (state: typeof initialState, action: ActionsforOrfersTypes) => {
    return updateObject(state, { loading: false });
};

const purchaseBurgerSuccess = (state: typeof initialState, action: ActionsforOrfersTypes) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId });
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder as [])
    });
};

const purchaseBurgerFail = (state: typeof initialState, action: ActionsforOrfersTypes) => {
    return updateObject(state, { loading: false });
};

const fetchOrdersStart = (state: typeof initialState, action: ActionsforOrfersTypes) => {
    return updateObject(state, { loading: true });
};

const fetchOrdersSuccess = (state: typeof initialState, action: ActionsforOrfersTypes) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
};

const fetchOrdersFail = (state: typeof initialState, action: ActionsforOrfersTypes) => {
    return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action: ActionsforOrfersTypes) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
        default: return state;
    }
};

export default reducer;