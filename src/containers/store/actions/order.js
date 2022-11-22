import * as actionType from "../actions/actionTypes";
import axios from "../../../axios-orders";
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        order: orderData
    };
};
export const purchaseBurgerFail = (error) => {
    return {
        type: actionType.PURCHASE_BURGER_FAIL,
        error: error
    };
};
export const purchaseBurgerStart = () => {
    dispatch(purchaseBurgerStart());
    return {
        type: actionType.PURCHASE_BURGER_START
    };
};
export const purchaseBurger = (orderData) => {
    return (dispatch) => {
        // dispatch(purchaseBurgerStart())
        axios.post('/orders.json', orderData)
            .then((response) => {
            dispatch(purchaseBurgerSuccess(response.data, orderData));
        })
            .catch((error) => {
            dispatch(purchaseBurgerFail(error));
        });
    };
};
function dispatch(arg0) {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=order.js.map