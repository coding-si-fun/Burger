import React from "react";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"

interface Props {
    ingredients:{
    salad:number;
    meat:number;
    cheese:number;
    bacon:number;
    }
}

class Checkout extends React.Component<{},Props> {
   state = {
    ingredients:{
        salad:1,
        meat:1,
        cheese: 1,
        bacon: 1
    }
   }

    render(): React.ReactNode {
         return (
            <div>
            <CheckoutSummary ingredients={this.state.ingredients} />
            </div>
        );
    }
}

export default Checkout