import React, { Dispatch } from "react";
import { AnyAction } from "redux";
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from "../../../axios-orders"
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/imput/input";
import { element, string } from "prop-types";
import {Ingredients} from "../../../containers/BurgerBuilder/BurgerBuilder"
import {History} from "history"
import {RouteComponentProps} from "react-router-dom"
import { connect } from 'react-redux'
import withErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHadler"
import * as actions from '../../../containers/store/actions/index'
import {OrderData} from "../../store/actions/order"

interface Props extends RouteComponentProps {
    valid?:string,
    price:number,
    loading:boolean,
    // ingredients:Ingredients,
    // orderData:{}
    onOrderBurger: (order:{})=>void
    purchaseBurgerStart():(orderdata:{})=>void
    
    changed:(e:React.SuspenseProps)=>void,
    // history:History,
    validation:{
        required?:boolean
        minLength?:number,
         maxLength?:number,
    }
    ings:Ingredients
    checkValidity:(
        value:string,
        rules:{
            required:boolean,
            minLength?:number,
            maxLength?:number
        }
    )=>void,
}

// interface Idn {
//     name:string | {},
//     street:string| {},
//     zipCode:string| {},
//     country:string| {},
//     email:string| {},
//     deliveryMethod:string| {}
// }


class ContactData extends React.Component <Props>{
    state = {
            orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                  
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    
                    type:'textarea',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
            
                    type:'text',
                    placeholder:'Zip Code'
                },
                value:'',
                validation:{
                    required:true, 
                    minLength:5,
                    maxLength:5,
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                   
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                   
                    type:'text',
                    placeholder:'Your E-Email'
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },
          deliveryMethod:{
            elementType:'select',
            elementConfig:{
               options:[{value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}] 
            },
            value:'fastest',
            validation:{
                required:true,
            },
            touched:false,
            valid:true,
        },
        },
        formIsValid:false,
      
    }   

    checkValidity(value:string,rules:{  required:boolean, minLength?:number, maxLength?:number}){
        let isValid = true
        if(rules.required){
            isValid = value.trim() !=='' && isValid
        }
        if (rules.minLength){
            isValid = value.length >=rules.minLength && isValid
        }
        if (rules.maxLength){
            isValid = value.length <=rules.maxLength && isValid
        }
        return isValid
    }
    orderHandler =(e: { preventDefault: () => void; }) => {
            e.preventDefault();
          const formData = {
            name:{},
            street:{},
            zipCode:{},
            country:{},
            email:{},
            deliveryMethod:{}
        }
          for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier as keyof typeof formData] = this.state.orderForm[formElementIdentifier as keyof typeof this.state.orderForm ].value
          }
        const order = {
        orderData:formData,
        ingredients:this.props.ings,
        price:this.props.price,
        }
        this.props.onOrderBurger(order)
   axios.post('/orders.json', order)
   .then((response) =>{
    this.setState({loading:false})
    this.props.history.push("/")
    })
   .catch((error) => 
   this.setState({loading:false})
   )
    }

    inputChangedHandler = (event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>, inputIdentifier:string) =>{
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement= {
            ...updatedOrderForm[inputIdentifier as keyof typeof updatedOrderForm ]
        }
        const formData = {
            name:{},
            street:{},
            zipCode:{},
            country:{},
            email:{},
            deliveryMethod:{}}
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        console.log("for idenidtifier",inputIdentifier)

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid =  updatedOrderForm[inputIdentifier as keyof typeof updatedOrderForm].valid && formIsValid
        }
        this.setState({orderForm:updatedOrderForm, formIsValid:formIsValid})
    }
    render(){
        const formElementsArray = [];
        for( let key in this.state.orderForm ){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key as keyof typeof this.state.orderForm]
            })
        }
        let form = ( <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement =>(
           
            <Input 
            key={formElement.id}
            elementType = {formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            invalid={!formElement.config.valid }
            touched= {formElement.config.touched}
            shouldValidate={formElement.config.validation}
            value={formElement.config.value } 
            changed={(event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>)=>this.inputChangedHandler(event , formElement.id)}/>
        ))}
        <Button className={classes.Button} btnType="Success"  disabled={!this.state.formIsValid} >ORDER</Button>
    </form>);
        if(this.props.loading){
            form= <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = (state:{ingredients:{}, totalPrice:number, loading:boolean} )=>{
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading
    }
}

const mapDispatchToProps =(dispatch) =>{
    return {
        onOrderBurger:(orderData:OrderData)=> dispatch(actions.purchaseBurger(orderData))
    }
  
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData, axios))


