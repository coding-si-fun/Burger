import React, { MouseEventHandler } from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

interface Props {
    // disabled: string[];
    isAuth: boolean;
    ordered: MouseEventHandler<HTMLButtonElement> | undefined;
    // disabled: any;
    ingredientAdded(type: string): void;
    ingredientRemoved(type: string): void;
    // ordered: MouseEventHandler<HTMLButtonElement> | undefined;
    purchasable: boolean;
    //onClick: React. MouseEvent<HTMLButtonElement, MouseEvent>
    price: number
    // disabled: DisabledInfo
    disabled: { [key: string]: number | boolean }
}

// interface Ingredients {
//     salad: string;
//     bacon: string;
//     meat: string;
//     cheese: string;

// }
// interface DisabledInfo {
//     salad: boolean,
//     cheese: boolean,
//     meat: boolean,
//     bacon: boolean,

// }


const controls = [
    { label: 'Salad', type: "salad" },
    { label: 'Beacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]



const buildControls: React.FC<Props> = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} price={0} />
        ))}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
);

export default buildControls;