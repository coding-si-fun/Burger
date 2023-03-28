import React, { MouseEventHandler, ReactNode } from 'react';

import classes from './Button.css';

interface Props {
    btnType: string;
    clicked?: MouseEventHandler<HTMLButtonElement>
    disabled?: boolean;
    children: ReactNode;

}

const button: React.FC<Props> = (props) => (
    <button
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

export default button;