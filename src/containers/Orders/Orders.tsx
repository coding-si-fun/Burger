import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { TypeDispatch } from '../..';

interface IExtraDispatchArguments {

}

interface IStoreState {

}

interface Props {
    loading: boolean;
    token: string;
    userId: string;
    orders: []

}
interface Ingredients {
    salad: string
    bacon: string
    cheese: string
    meat: string
}

interface Props {
    onFetchOrders(token: string, userId: string): () => void
}

const orders: React.FC<Props> = props => {
    const { onFetchOrders } = props
    useEffect(() => {
        onFetchOrders(props.token, props.userId);
    }, [onFetchOrders])



    let orders: JSX.Element[] = [<Spinner />];
    if (!props.loading) {
        orders = props.orders.map((order: { id: string; ingredients: Ingredients; price: string }) => (
            <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price} />
        ))
        console.log("the bane ")
    }
    return (
        <div>
            {orders}
        </div>
    );
}

const mapStateToProps = (state: {
    order: { orders: {}; loading: boolean }; auth: { token: string; userId: string; }
}) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = (dispatch: TypeDispatch) => {
    return {
        onFetchOrders: (token: string, userId: string) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));