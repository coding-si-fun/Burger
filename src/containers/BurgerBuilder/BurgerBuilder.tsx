import { number, object } from "prop-types";

import React, {Component, Dispatch, ReactNode} from "react";
import Burger from "../../components/Burger/Burger";
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from "../../components/Burger/orderSummary/orderSummary";

import Aux from "../../hoc/_Aux/_Aux"
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHadler"

import { History } from 'history';
import {RouteComponentProps, useHistory} from "react-router-dom"
import {connect, useDispatch} from 'react-redux'
import * as actions from '../store/actions/index'

import axios from "../../axios-orders"
import { AnyAction } from "redux";





export interface Ingredients {
  ingredients: any;
  salad:number;
  bacon:number;
  cheese:number;
  meat:number;
}

export interface BurgerBuilderState extends RouteComponentProps{
  ingredients:Ingredients
  ings:Ingredients
  children?: JSX.Element|JSX.Element[];
  purchasing:boolean,
  loading:boolean,
  error:boolean
  onIngredientAdded:()=>void
  onIngredientRemove:()=>void
  updatePurchaseState:()=>void
  onInitIngredients:()=>void
  price:number
  onInitPurchase:()=>void
}




export interface DisabledInfo {
  salad: boolean,
  cheese: boolean,
  meat: boolean,
  bacon: boolean,
  [key: string]: boolean,
}

const DISABLED_INFO: DisabledInfo = {
  salad:true,
  cheese:true,
  meat:true,
  bacon:true
}

type MyActions = {
  ingredients:{
  salad:number;
  bacon:number;
  cheese:number;
  meat:number;
}
}



  class BurgerBuilder extends React.Component <BurgerBuilderState> {

  state = {
    
    // ingredients:{},
    purchasing:false,
    // disabled:false,
    error:{}
  }
  componentDidMount () {
    this.props.onInitIngredients()
}
 
  updatePurchaseState(ingredients:Ingredients){

    const sum = Object.keys(ingredients).map((igKey) =>{
      return ingredients[igKey as keyof Ingredients];

    }).reduce((sum, el)=>{
      return sum+el;
    },0)

    return sum > 0;

  }

  purchaseHandler=()=>{
    this.setState({purchasing:true})
  }
  purchaseCancelHandler=()=>{
    this.setState({purchasing:false})
  }

  purchaseContinueHandler = ()=>{
    this.props.onInitPurchase();
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


  }
    render () {
      let disabledInfo: DisabledInfo = {
        ...DISABLED_INFO
      }
      //  disabledInfo:boolean;
      for ( let key in  disabledInfo) {        
        disabledInfo[key]=this.props.ings[key as keyof Ingredients] <= 0 
      }

       let orderSummary=null
      let burger = this.state.error ?  <Spinner />:<p>Ingredients can't be loaded!</p>

      if (this.props.ings){
       burger =  (
        <>
       <Burger ingredients={this.props.ings} />
       <BuildControls
        ingredientAdded={this.props.onIngredientAdded}
        ingredientRemoved={this.props.onIngredientRemove}
        disabled={disabledInfo}
        purchasable={this.updatePurchaseState(this.props.ings)}
        price={this.props.price}
        ordered={this.purchaseHandler} />
        </>);
    

         orderSummary =  <OrderSummary 
         ingredientss={this.props.ings}
         purchaseCanceled={this.purchaseCancelHandler}
         price={this.props.price}
         purchaseContinued={ this.purchaseContinueHandler }
         />
      

      }
        return (
          <Aux>
            <>
            <Modal show={this.state.purchasing}>
            { orderSummary }
            </Modal>
            {burger}
            </>
          </Aux>
        )
    }
}
const mapStateToProps = (state: {
  burgerBuilder:{
 ingredients: Ingredients; totalPrice:number,error:boolean }
}) =>{
  return {
    ings:state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice ,
    error:state.burgerBuilder.error
  };
}

const mapDispatchToProps = (dispatch)=> {
  console.log("I come from dispatch'",dispatch)
  return {
    onIngredientAdded:(ingName: Ingredients)=>dispatch (actions.addIngredient(ingName)),
    onIngredientRemove:(ingName:Ingredients)=>dispatch ((actions.removeIngredient(ingName))),
    onInitIngredients:()=>dispatch((actions.initIngredients())),
    onInitPurchase:()=>dispatch(actions.purchaseInit)
    
    
  }
}




export default connect( mapStateToProps,mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ))