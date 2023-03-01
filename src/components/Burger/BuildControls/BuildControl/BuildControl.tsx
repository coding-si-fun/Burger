import React, { MouseEventHandler } from 'react';

import classes from './BuildControl.css';

interface Props {
    label: string;
    disabled: boolean;
    removed: () => void;
    added: () => void;
    price: number;
}

const buildControl: React.FC<Props> = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button
            className={classes.Less}
            onClick={props.removed}
            disabled={props.disabled}>Less</button>
        <button
            className={classes.More}
            onClick={props.added}>More</button>
    </div>
);

export default buildControl;