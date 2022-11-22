import React from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/imput/input";
import { connect } from 'react-redux';
import withErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHadler";
import * as actions from '../../../containers/store/actions/index';
// interface Idn {
//     name:string | {},
//     street:string| {},
//     zipCode:string| {},
//     country:string| {},
//     email:string| {},
//     deliveryMethod:string| {}
// }
class ContactData extends React.Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-Email'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }]
                },
                value: '',
                validation: {
                    required: true,
                },
                touched: false,
                valid: true,
            },
        },
        formIsValid: false,
    };
    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }
    orderHandler = (e) => {
        e.preventDefault();
        const formData = {
            name: {},
            street: {},
            zipCode: {},
            country: {},
            email: {},
            deliveryMethod: {}
        };
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            orderData: formData,
            ingredients: this.props.ings,
            price: this.props.price,
        };
        this.props.onOrderBurger(order);
        axios.post('/orders.json', order)
            .then((response) => {
            this.setState({ loading: false });
            this.props.history.push("/");
        })
            .catch((error) => this.setState({ loading: false }));
    };
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        const formData = {
            name: {},
            street: {},
            zipCode: {},
            country: {},
            email: {},
            deliveryMethod: {}
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        console.log("for idenidtifier", inputIdentifier);
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    };
    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (React.createElement("form", { onSubmit: this.orderHandler },
            formElementsArray.map(formElement => (React.createElement(Input, { key: formElement.id, elementType: formElement.config.elementType, elementConfig: formElement.config.elementConfig, invalid: !formElement.config.valid, touched: formElement.config.touched, shouldValidate: formElement.config.validation, value: formElement.config.value, changed: (event) => this.inputChangedHandler(event, formElement.id) }))),
            React.createElement(Button, { className: classes.Button, btnType: "Success", disabled: !this.state.formIsValid }, "ORDER")));
        if (this.props.loading) {
            form = React.createElement(Spinner, null);
        }
        return (React.createElement("div", { className: classes.ContactData },
            React.createElement("h4", null, "Enter your Contact Data"),
            form));
    }
}
const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        loading: state.loading
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
//# sourceMappingURL=ContactData.js.map