import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
class App extends Component {
    render() {
        return (React.createElement("div", null,
            React.createElement(Layout, null,
                React.createElement(Switch, null,
                    React.createElement(Route, { path: "/checkout", component: Checkout }),
                    React.createElement(Route, { path: "/orders", component: Orders }),
                    React.createElement(Route, { path: "/", exact: true, component: BurgerBuilder })))));
    }
}
export default App;
//# sourceMappingURL=App.js.map