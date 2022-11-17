import React from "react";
import { History, Location } from 'history';
import {Route, useHistory} from "react-router-dom"
import {Ingredients} from "../../containers/BurgerBuilder/BurgerBuilder"
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import ContactData from './ContactData/ContactData'
import {RouteComponentProps} from 'react-router-dom'
import {connect} from 'react-redux'


interface Props extends RouteComponentProps  {
    // history?:History
    // location?:Location
    totalPrice:number
    ing:Ingredients
    price:number
    ings:Ingredients
}


class Checkout extends React.Component<Props> {
   checkoutCancelledHandler=()=>{
    this.props.history.goBack()
   }

   checkoutContinuedHandler=()=>{
     this.props.history.replace('/checkout/contact-data')
   }

    render() {
         return (
            <div>
            <CheckoutSummary 
            ingredientss={this.props.ings}
            checkoutCancelled={ this.checkoutCancelledHandler }
            checkoutContinued={ this.checkoutContinuedHandler } />
            <Route path={this.props.match.path + '/contact-data'} 
            component={ContactData}
            />
            </div>
        );
    }
}

const mapStateToProps = (state:{totalPrice:number, ingredients:Ingredients}) => {
    return {
        ings:state.ingredients
        
    }
}

export default connect(mapStateToProps)(Checkout)