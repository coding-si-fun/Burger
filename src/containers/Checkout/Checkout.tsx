import React from "react";
import { History, Location } from 'history';
import {Route, useHistory, Redirect} from "react-router-dom"
import {Ingredients} from "../../containers/BurgerBuilder/BurgerBuilder"
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import ContactData from './ContactData/ContactData'
import {RouteComponentProps} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from "../store/actions/index"


interface Props extends RouteComponentProps  {
    // history?:History
    // location?:Location
    totalPrice:number
    ing:Ingredients
    price:number
    ings:Ingredients
    onInitPurchase:()=>void
    purchased:()=>void
}


class Checkout extends React.Component<Props> {
    componentWillMount(): void {
        this.props.onInitPurchase();
    }
   checkoutCancelledHandler=()=>{
    this.props.history.goBack()
   }

   checkoutContinuedHandler=()=>{
     this.props.history.replace('/checkout/contact-data')
   }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ?  <Redirect to="/"/> : null
            console.log(" this is for redirecting", this.props.ings)
            summary = (
            <div>
                {purchasedRedirect}
            <CheckoutSummary 
            ingredientss={this.props.ings}
            checkoutCancelled={ this.checkoutCancelledHandler }
            checkoutContinued={ this.checkoutContinuedHandler } />
            <Route path={this.props.match.path + '/contact-data'} 
            component={ContactData}
            /> 
            </div>
            )
        }
         return summary
          
          
     
    }
}

const mapStateToProps = (state:{burgerBuilder:{ingredients:Ingredients}, order:{
    purchased:boolean;
}}) => {
    return {
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
        
    }
}

const mapDispatchToProps = (dispatch: (arg0: { type: string; }) => {}) => {
    return {
        onInitPurchase:() => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps )(Checkout)