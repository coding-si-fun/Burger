import React from "react";
import {Route, useHistory} from "react-router-dom"

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import ContactData from './ContactData/ContactData'



interface Props {
    ingredients:{
    salad:number;
    meat:number;
    cheese:number;
    bacon:number;
    }
}

class Checkout extends React.Component<{},Props> {
   state = {
    ingredients:0,
    price:0,
   }

   componentWillMount(){
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {}
    let price = 0;
    for (let param of query.entries()) {
        //['salad', '1' ]
        if( param[0] === "price"){
            price=param[1]
        }else{
            ingredients[param[0]] = +param[1]
        }
       
    }
    this.setState({ingredients:ingredients, totalPrice:price})
   }
   checkoutCancelledHandler=()=>{
    this.props.history.goBack()
   }

   checkoutContinuedHandler=()=>{
    // const his/tory= useHistory();
     this.props.history.replace('/checkout/contact-data')
   }

    render() {
         return (
            <div>
            <CheckoutSummary 
            ingredientss={this.state.ingredients}
            checkoutCancelled={ this.checkoutCancelledHandler }
            checkoutContinued={ this.checkoutContinuedHandler } />
            <Route path={this.props.match.path + '/contact-data'} 
            render={(props)=> (<ContactData ingredients={this.state.ingredients } price={this.state.totalPrice} {...props} />)}
            />
            </div>
        );
    }
}

export default Checkout