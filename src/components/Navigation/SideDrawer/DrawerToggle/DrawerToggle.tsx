import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

import classes from './DrawerToggle.css';

interface Props {
    clicked: React.MouseEventHandler<HTMLDivElement>
}

const drawerToggle: React.FC<Props> = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;