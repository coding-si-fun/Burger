import { number, object } from "prop-types";
import React, {Component} from "react";
import Burger from "../../components/Burger/Burger";
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from "../../components/Burger/orderSummary/orderSummary";

import Aux from "../../hoc/Aux"
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

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
}
const INGREDIENT_PRICES = {
  salad:0.5,
  cheese:0.4,
  meat:1,
  bacon:2
}


class BurgerBuilder extends React.Component<{}, BurgerBuilderState> {

  state= {
    ingredients:{
      salad:0,
      bacon:0,
      cheese:0,
      meat:0
    },
    totalPrice:4,
    purchaseable:false,
    purchasing:false
  }
  
  
  updatePurchaseState(){

    const ingredients = {
      ...this.state.ingredients
    }
    const sum = Object.keys(ingredients).map(igKey=>{
      return ingredients[igKey];

    }).reduce((sum, el)=>{
      return sum+el;
    },0)

    this.setState({purchaseable: sum > 0})

  }

   addIgredientHandler = (type:keyof Ingredients) => {
    const oldCount:number = this.state.ingredients[type];
    console.log(typeof oldCount)
    const updatedCount = oldCount +1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition =INGREDIENT_PRICES[type]
    const oldPrice =this.state.totalPrice;
    const newPrice =oldPrice + priceAddition;
    this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
    this.updatePurchaseState();

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
    this.updatePurchaseState()
  }
  purchaseHandler=()=>{
    this.setState({purchasing:true})
  }
    render () {
      let disabledInfo = {
        ...this.state.ingredients
      }
      //  disabledInfo:boolean;
      for ( let key in  disabledInfo) {        
        disabledInfo[key]=disabledInfo[key] <= 0 
      }

        return (
          <Aux>
            <Modal show={this.state.purchasing}>
              <OrderSummary ingredients={this.state.ingredients}/>
            </Modal>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls 
            ingredientAdded ={this.addIgredientHandler}
            ingredientRemoved ={this.removeIngrediantHandler}
            disabled={disabledInfo}
            purchasable ={this.state.purchaseable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
            />
          </Aux>
        )
    }
}
export default BurgerBuilder