import React, { DetailedHTMLProps, HTMLAttributes, MouseEventHandler } from 'react';

import classes from './Backdrop.css';

interface Props {
    clicked: MouseEventHandler<HTMLDivElement>
    onClick?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    // clicked: boolean;
    show: boolean;
}

const backdrop: React.FC<Props> = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;