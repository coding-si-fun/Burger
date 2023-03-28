import React, { Component, useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import { TypeDispatch } from '.';

import asyncComponent from "./hoc/asyncComponent/asyncComponent"

interface Props {
  onTryAutoSignup: () => void
  isAuthenticated: boolean;
}

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout')
})

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders')
})

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth')
})


const App: React.FC<Props> = props => {
  const { onTryAutoSignup } = props
  useEffect(() => {

    props.onTryAutoSignup();
  }, [onTryAutoSignup])


  let routes = (
    <Switch>
      <Route path="/auth" render={() => <Auth isSignup={false} {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth  {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <>
        <Layout>
          <Suspense fallback={<p>Loading...</p>} >{routes}</Suspense>
        </Layout>
      </>
    </div >
  );

}

const mapStateToProps = (state: { auth: { token: null; }; }) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch: TypeDispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
