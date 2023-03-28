import React, { Component, FormEvent, FormEventHandler, useState, useEffect } from 'react';
import { connect, MapDispatchToPropsParam } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { Action, AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
// import { IExtraDispatchArguments, IStoreState } from "../myGlobalTypes"

import { updateObject, checkValidity } from "../shared/utility"

interface IExtraDispatchArguments {

}

interface IStoreState {

}

interface Props {
    onSetAuthRedirectPath: () => void
    buildingBurger: boolean;
    authRedirectPath: string;
    onAuth: (email: string, password: string, isSignup: boolean) => void
    isSignup?: boolean;
    loading: boolean;
    error: { message?: string; }
    isAuthenticated: boolean;
    elementConfig?: { options?: [] }
}

const auth: React.FC<Props> = props => {
    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    })
    const [isSignup, setIsSignUp] = useState(true)

    const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props
    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath])

    const inputChangedHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, controlName: string) => {
        const updatedControls = updateObject(authForm, {
            [controlName]: updateObject(authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            })
        });
        setAuthForm(updatedControls)
    }

    const submitHandler = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignup);
    }

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignup)
    }
    const formElementsArray = [];
    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key]
        });
    }

    let form: {} = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)} />
    ));

    if (props.loading) {
        form = <Spinner />
    }

    let errorMessage = null;

    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                <>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </>
            </form>
            <Button
                clicked={switchAuthModeHandler}
                btnType="Danger">SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    );
}

const mapStateToProps = (state: { auth: { loading: boolean; error: {}; token: string; autoRedirectPath: string; }; burgerBuilder: { building: boolean } }) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.autoRedirectPath
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IStoreState, IExtraDispatchArguments, AnyAction>) => {
    return {
        onAuth: (email: string, password: string, isSignup: boolean) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);