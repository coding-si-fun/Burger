import React, { Component, MouseEventHandler, useState, useEffect, useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
import { RouteComponentProps } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { TypeDispatch } from '../..';

interface IExtraDispatchArguments {

}

interface IStoreState {

}

interface Ingredients {
    salad: number
    bacon: number
    cheese: number
    meat: number
}

interface Props extends RouteComponentProps {
    onInitIngredients: () => void
    isAuthenticated: boolean;
    onSetAuthRedirectPath(path: string): () => void
    onInitPurchase: () => void
    onIngredientAdded: () => void
    onIngredientRemoved: () => void
    ings: Ingredients
    error: {}
    // disabled: MouseEventHandler<HTMLButtonElement>
    price: number
}

export interface DisabledInfo {
    salad: boolean,
    cheese: boolean,
    meat: boolean,
    bacon: boolean,
    [key: string]: boolean,
}

const DISABLED_INFO: DisabledInfo = {
    salad: true,
    cheese: true,
    meat: true,
    bacon: true
}

const burgerBuilder: React.FC<Props> = props => {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }



    const dispatch = useDispatch();
    const ings = useSelector(state => {
        return state.burgerBuilder.ingredients;
    })
    const price = useSelector(state => {
        return state.burgerBuilder.totalPrice;
    })
    const error = useSelector(state => {
        return state.burgerBuilder.error;
    })
    const isAuthenticated = useSelector(state => {
        return state.auth.token !== null;
    })

    const onIngredientAdded = (ingName: string) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = (ingName: string) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path: string) => dispatch(actions.setAuthRedirectPath(path));

    const [purchasing, setPurchasing] = useState(false)

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients])

    const updatePurchaseState = (ingredients: Ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey as keyof typeof ingredients];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true)
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }


    const disabledInfo: {
        [key: string]: number | boolean
    } = {
        ...ings
        // ...DISABLED_INFO
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if (ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings} />
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(ings)}
                    ordered={purchaseHandler}
                    isAuth={isAuthenticated}
                    price={price} />
            </Aux>
        );
        orderSummary = <OrderSummary
            ingredients={ings}
            price={price}
            purchaseCanceled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler} />;
    }
    // {salad: true, meat: false, ...}
    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}

// const mapStateToProps = (state: {
//     auth: { token: string }; burgerBuilder: { ingredients: Ingredients; totalPrice: number; error: string }
// }) => {
//     return {
//         ings: state.burgerBuilder.ingredients,
//         price: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuthenticated: state.auth.token !== null
//     };
// }

// const mapDispatchToProps = (dispatch: TypeDispatch) => {
//     return {
//         onIngredientAdded: (ingName: string) => dispatch(actions.addIngredient(ingName)),
//         onIngredientRemoved: (ingName: string) => dispatch(actions.removeIngredient(ingName)),
//         onInitIngredients: () => dispatch(actions.initIngredients()),
//         onInitPurchase: () => dispatch(actions.purchaseInit()),
//         onSetAuthRedirectPath: (path: string) => dispatch(actions.setAuthRedirectPath(path))
//     }
// }

export default withErrorHandler(burgerBuilder, axios);