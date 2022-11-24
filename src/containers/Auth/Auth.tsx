import React from 'react'

import Input from "../../components/UI/imput/input"
import Button from "../../components/UI/Button/Button"
import classes from './Auth.css'
import * as actions from '../store/actions/index'

import { connect } from 'react-redux'
import { AnyAction, Dispatch } from 'redux'

export class Auth extends React.Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {

                    type: 'email',
                    placeholder: 'Your e-mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                    minLength: 6

                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7,
                    isPass: true
                },
                valid: false,
                touched: false
            },
        }
    }

    checkValidity(value: string, rules: { required: boolean, minLength?: number, maxLength?: number }) {
        let isValid = true
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName as keyof typeof this.state.controls],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName as keyof typeof this.state.controls].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls })

    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth()
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key as keyof typeof this.state.controls]
            })
        }

        const form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                shouldValidate={formElement.config.validation}
                value={formElement.config.value}
                changed={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => this.inputChangeHandler(event, formElement.id)} />
        ))

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">
                        SUBMIT
                    </Button>
                </form>
            </div >
        )
    }
}

const mapDispatchToProps = dispatch => {
    console.log("I come from dispatchfdfdffdfdf'", dispatch)
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
}

export default connect(null, mapDispatchToProps)(Auth)


