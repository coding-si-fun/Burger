import React from "react";
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from "../../../axios-orders"
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/imput/input";
import { element } from "prop-types";

class ContactData extends React.Component {
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
                valid:false
            },
          deliveryMethod:{
            elementType:'select',
            elementConfig:{
               options:[{value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}]
            },
            value:'',
            valid:true,
        },
        },
        formIsValid:false,
        loading:false,
    }   

    checkValidity(value,rules){
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
    orderHandler = (event) => {
        event.preventDefault();
          this.setState({loading:true})
          const formData ={}
          for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
          }
        const order = {
        orderData:formData,
        ingredients:this.props.ingredients,
        price:this.props.price,
    
        }
   axios.post('/orders.json', order)
   .then((response: {}) =>{
    this.setState({loading:false})
    this.props.history.push("/")
    })
   .catch((error:{}) => 
   this.setState({loading:false})
   )
    }

    inputChangedHandler = (event,inputIdentifier)=>{
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement= {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        console.log(formIsValid)
        this.setState({orderForm:updatedOrderForm, formIsValid:formIsValid})
    }
    render(){
        const formElementsArray = [];
        for( let key in this.state.orderForm ){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
            console.log(formElementsArray)
        }
        let form = ( <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement =>(
            <Input 
            key={formElement.id}
            elementType = {formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            invalid={!formElement.config.valid }
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
            defaultValue={formElement.config.defaultValue } 
            changed={()=>this.inputChangedHandler(event, formElement.id)}/>
        ))}
        <Button btnType="Success"  disabled={!this.state.formIsValid}className={classes.Button}>ORDER</Button>
    </form>);
        if(this.state.loading){
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


export default ContactData