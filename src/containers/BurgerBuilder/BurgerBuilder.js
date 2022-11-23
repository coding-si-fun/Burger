import React from "react";
import Burger from "../../components/Burger/Burger";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/orderSummary/orderSummary";
import Aux from "../../hoc/_Aux/_Aux";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHadler";
import { connect } from 'react-redux';
import * as BurgerBuilderActions from '../store/actions/index';
import axios from "../../axios-orders";
const DISABLED_INFO = {
    salad: true,
    cheese: true,
    meat: true,
    bacon: true
};
class BurgerBuilder extends React.Component {
    state = {
        // ingredients:{},
        purchasing: false,
        // disabled:false,
        error: {}
    };
    componentDidMount() {
        this.props.onInitIngredients();
    }
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };
    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
        // const queryParams=[]
        // for (let i in this.state.ingredients){
        //    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i as keyof Ingredients]))
        // }
        // queryParams.push('price=' + this.state.totalPrice)
        // const queryString = queryParams.join('&')
        // //  const history = History
        // this.props.history.push({
        //   pathname:"/checkout",
        //   search:"?" + queryString
        // })
    };
    render() {
        let disabledInfo = {
            ...DISABLED_INFO
        };
        //  disabledInfo:boolean;
        for (let key in disabledInfo) {
            disabledInfo[key] = this.props.ings[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? React.createElement("p", null, "Ingredients can't be loaded!") : React.createElement(Spinner, null);
        if (this.props.ings) {
            burger = (React.createElement(React.Fragment, null,
                React.createElement(Burger, { ingredients: this.props.ings }),
                React.createElement(BuildControls, { ingredientAdded: this.props.onIngredientAdded, ingredientRemoved: this.props.onIngredientRemove, disabled: disabledInfo, purchasable: this.updatePurchaseState(this.props.ings), price: this.props.price, ordered: this.purchaseHandler })));
            orderSummary = React.createElement(OrderSummary, { ingredientss: this.props.ings, purchaseCanceled: this.purchaseCancelHandler, price: this.props.price, purchaseContinued: this.purchaseContinueHandler });
        }
        return (React.createElement(Aux, null,
            React.createElement(React.Fragment, null,
                React.createElement(Modal, { show: this.state.purchasing }, orderSummary),
                burger)));
    }
}
const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
};
const mapDispatchToProps = (dispatch) => {
    console.log("I come from dispatch'", dispatch);
    return {
        onIngredientAdded: (ingName) => dispatch(BurgerBuilderActions.addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch((BurgerBuilderActions.removeIngredient(ingName))),
        onInitIngredients: () => dispatch((BurgerBuilderActions.initIngredients()))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
//# sourceMappingURL=BurgerBuilder.js.map