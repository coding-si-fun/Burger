import { number, object } from "prop-types";
import React, {Component} from "react";
import Burger from "../../components/Burger/Burger";
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from "../../components/Burger/orderSummary/orderSummary";

import Aux from "../../hoc/_Aux/_Aux"
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

import axios from "../../axios-orders"

import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHadler"

export interface Ingredients {
  salad:number;
  bacon:number;
  cheese:number;
  meat:number;
}

export interface BurgerBuilderState{
 ingredients:Ingredients
  totalPrice:number;
  purchaseable:boolean;
  children?: JSX.Element|JSX.Element[];
  purchasing:boolean,
  loading:boolean,
  data:object;
 
}

interface Ings {
  children: JSX.Element
}

const INGREDIENT_PRICES = {
  salad:0.5,
  cheese:0.4,
  meat:1,
  bacon:2
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



  class BurgerBuilder extends React.Component <{},BurgerBuilderState, Ings> {

  state= {
    ingredients:{
      salad:0,
      bacon:0,
      cheese:0,
      meat:0
    },
    totalPrice:4,
    purchaseable:false,
    purchasing:false,
    disabled:false,
    loading:false,
    error:false
  }
  componentDidMount () {
    axios.get( 'https://burger-12c1d-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json' )
        .then( (response:  object) => {
            this.setState( { ingredients: response.data } );
        } )
        .catch( (error:object) => {
            this.setState( { error: true } );
        } );
}
 
  
  updatePurchaseState(ingredients:Ingredients){

    const sum = Object.keys(ingredients).map((igKey) =>{
      return ingredients[igKey as keyof Ingredients];

    }).reduce((sum, el)=>{
      return sum+el;
    },0)

    this.setState({purchaseable: sum > 0})

  }

   addIgredientHandler = (type:keyof Ingredients) => {
    const oldCount:number = this.state.ingredients[type];
    console.log(typeof oldCount)
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition =INGREDIENT_PRICES[type]
    const oldPrice =this.state.totalPrice;
    const newPrice =oldPrice + priceAddition;
    this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
    this.updatePurchaseState(updatedIngredients);

  }
  removeIngrediantHandler = (type:keyof Ingredients) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0){
      return
    }
    const updatedCount = oldCount -1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceDeduction =INGREDIENT_PRICES[type]
    const oldPrice =this.state.totalPrice;
    const newPrice =oldPrice - priceDeduction;
    this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
    this.updatePurchaseState(updatedIngredients)
  }
  purchaseHandler=()=>{
    this.setState({purchasing:true})
  }
  purchaseCancelHandler=()=>{
    this.setState({purchasing:false})
  }

  purchaseContinueHandler =()=>{
    this.setState({loading:true})
    const order = {
      ingredients:this.state.ingredients,
      price:this.state.totalPrice,
      customer:{
        name:"Rimantas Preiksas",
        address:{
          street:"Teststeet 2",
          zipCode:"41351",
          country:"Lithuania"
        },
        email:"test@test.com"
      },
      deliveryMethod:"fastest"
    }
   axios.post('/orders.json', order)
   .then((response: {}) =>
    this.setState({loading:false,purchasing:false})
   )
   .catch((error:{}) => 
   this.setState({loading:false, purchasing:false})
   )
  }
    render () {
      let disabledInfo: DisabledInfo = {
        ...DISABLED_INFO
      }
      //  disabledInfo:boolean;
      for ( let key in  disabledInfo) {        
        disabledInfo[key]=this.state.ingredients[key as keyof Ingredients] <= 0 
      }

      let orderSummary = null;
      let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;


      if (this.state.ingredients){
       burger =  (
       <Aux> <>
       <Burger ingredients={this.state.ingredients} /><BuildControls
        ingredientAdded={this.addIgredientHandler}
        ingredientRemoved={this.removeIngrediantHandler}
        disabled={disabledInfo}
        purchasable={this.state.purchaseable}
        price={this.state.totalPrice}
        ordered={this.purchaseHandler} />
        </></Aux>);

         orderSummary =  <OrderSummary 
         ingredientss={this.state.ingredients}
         purchaseCanceled={this.purchaseCancelHandler}
         price={this.state.totalPrice}
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
            { orderSummary}
            </Modal>
            {burger}
            </>
          </Aux>
        )
    }
}
export default withErrorHandler(BurgerBuilder, axios)