import React from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
class Checkout extends React.Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };
    render() {
        let summary = React.createElement(Redirect, { to: "/" });
        if (this.props.ings) {
            console.log(" this is for redirecting", this.props.ings);
            summary = (React.createElement("div", null,
                React.createElement(CheckoutSummary, { ingredientss: this.props.ings, checkoutCancelled: this.checkoutCancelledHandler, checkoutContinued: this.checkoutContinuedHandler }),
                React.createElement(Route, { path: this.props.match.path + '/contact-data', component: ContactData })));
        }
        return summary;
    }
}
const mapStateToProps = (state) => {
    return {
        ings: state.ingredients
    };
};
export default connect(mapStateToProps)(Checkout);
//# sourceMappingURL=Checkout.js.map