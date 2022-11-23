import React, { Dispatch } from 'react'
import Order from '../../components/Order/order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHadler'
import {Ingredients} from "../../containers/BurgerBuilder/BurgerBuilder"
import {RouteComponentProps} from "react-router-dom"
import { string } from 'prop-types'
import * as actions from "../../containers/store/actions/index"
import {connect} from "react-redux"
import Spinner from '../../components/UI/Spinner/Spinner'
import { ThunkAction } from 'redux-thunk'
import { Action, AnyAction } from 'redux'

interface Props extends RouteComponentProps{
    ingredients:{},
    price:number | string
    loading:boolean
    // orders:JSX.Element
    onFetchOrders:()=>void
}

const Oorder = {
    id:string
}

class Orders extends React.Component <Props >{
    // state={
    //     orders:[],
    //     loading:true
    // }
    componentDidMount() {
        this.props.onFetchOrders();
    }
    render() {
        let orders = <Spinner />;
        if (!this.props.loading){
            orders = this.props['orders'].map((order:string)=> (
                    <Order key={order['id'] }
                    ingredients={order['ingredients']}
                    price={order['price']}></Order>
                ))
        }
        return (
        <div>
            {orders}
        </div>
        )
    }
}

const mapStateToProps =(state:{order:{orders:[], loading:boolean}})=> {
    return {
        orders:state.order.orders,
        loading:state.order.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders:()=>dispatch(actions.fetchOrders())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))