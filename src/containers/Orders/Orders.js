import React from 'react';
import Order from '../../components/Order/order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHadler';
import { string } from 'prop-types';
const Oorder = {
    id: string
};
class Orders extends React.Component {
    state = {
        orders: [],
        loading: true
    };
    componentDidMount() {
        axios.get('orders.json')
            .then((res) => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({ loading: false, orders: fetchedOrders });
        }).catch(err => {
            this.setState({ loading: false });
        });
    }
    render() {
        return (React.createElement("div", null, this.state.orders.map((order) => (React.createElement(Order, { key: order['id'], ingredients: order['ingredients'], price: order['price'] })))));
    }
}
export default withErrorHandler(Orders, axios);
//# sourceMappingURL=Orders.js.map