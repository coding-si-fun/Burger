import React from 'react'
import Order from '../../components/Order/order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHadler'
import {Ingredients} from "../../containers/BurgerBuilder/BurgerBuilder"
import {RouteComponentProps} from "react-router-dom"
import { string } from 'prop-types'

interface Props extends RouteComponentProps{
    ingredients:{},
    price:number | string
}

const Oorder = {
    id:string
}

class Orders extends React.Component <Props >{
    state={
        orders:[],
        loading:true
    }
    componentDidMount() {
        axios.get('orders.json')
        .then((res) => {
            const fetchedOrders=[];
            for(let key in res.data ){
                fetchedOrders.push({
                    ...res.data[key],
                    id:key
                })
            }
            this.setState({loading:false, orders:fetchedOrders})
        }).catch( err => {
            this.setState({loading:false})
        })
    }
    render() {
        return (
        <div>
            {this.state.orders.map((order )=> (
                <Order key={order['id'] }
                ingredients={order['ingredients']}
                price={order['price']}></Order>
            ))}
        </div>
        )
    }
}
export default withErrorHandler(Orders, axios)