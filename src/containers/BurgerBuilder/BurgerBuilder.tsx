import { number, object } from "prop-types";

import React, {Component, Dispatch, ReactNode} from "react";
import Burger from "../../components/Burger/Burger";
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from "../../components/Burger/orderSummary/orderSummary";

import Aux from "../../hoc/_Aux/_Aux"
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

import axios from "../../axios-orders"

import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHadler"

import { History } from 'history';
import {RouteComponentProps, useHistory} from "react-router-dom"
import {connect, useDispatch} from 'react-redux'
import * as actionType from '../../containers/store/actions'
import { AnyAction } from "redux";





export interface Ingredients {
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
  price:number
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
    
    
    purchasing:false,
    disabled:false,
    loading:false,
    error:false
  }
  componentDidMount () {
    console.log(this.props)
    axios.get( 'https://burger-12c1d-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json' )
        .then( (response) => {
            this.setState( { ingredients: response.data } );
        } )
        .catch( (error) => {
            this.setState( { error: true } );
        } );
}
 
  
  updatePurchaseState(ingredients:Ingredients){

    const sum = Object.keys(ingredients).map((igKey) =>{
      return ingredients[igKey as keyof Ingredients];

    }).reduce((sum, el)=>{
      return sum+el;
    },0)

    return sum > 0;

  }

  //  addIgredientHandler = (type:keyof Ingredients) => {
  //   const oldCount:number = this.state.ingredients[type];
  //   console.log(typeof oldCount)
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition =INGREDIENT_PRICES[type]
  //   const oldPrice =this.state.totalPrice;
  //   const newPrice =oldPrice + priceAddition;
  //   this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
  //   this.updatePurchaseState(updatedIngredients);

  // }
  // removeIngrediantHandler = (type:keyof Ingredients) => {
  //   const oldCount = this.state.ingredients[type];
  //   if(oldCount <= 0){
  //     return
  //   }
  //   const updatedCount = oldCount -1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   }
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction =INGREDIENT_PRICES[type]
  //   const oldPrice =this.state.totalPrice;
  //   const newPrice =oldPrice - priceDeduction;
  //   this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
  //   this.updatePurchaseState(updatedIngredients)
  // }
  purchaseHandler=()=>{
    this.setState({purchasing:true})
  }
  purchaseCancelHandler=()=>{
    this.setState({purchasing:false})
  }

  purchaseContinueHandler = ()=>{
    this.props.history.push('/checkout')
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
      let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;


      if (this.props.ings){
       burger =  (
        <>
       <Burger ingredients={this.props.ings} /><BuildControls
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
         purchaseContinued={this.purchaseContinueHandler}
         />

      }
      if (this.state.loading){
        orderSummary = <Spinner />
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
const mapStateToProps = (state: { ingredients: Ingredients; totalPrice:number }) =>{
  return {
    ings:state.ingredients,
    price:state.totalPrice 
  };
}

const mapDispatchToProps = (dispatch:Dispatch<AnyAction>) => {
  console.log("I come from dispatch'",dispatch)
  return {
    onIngredientAdded:(ingName: Ingredients)=>dispatch ({type:actionType.ADD_INGREDIENTS, ingredientName:ingName}),
    onIngredientRemove:(ingName:Ingredients)=>dispatch ({type:actionType.REMOVE_INGREDIENTS, ingredientName:ingName})
    
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ))