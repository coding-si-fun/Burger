import React, { ReactNode, RefAttributes } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

export interface Props {
    children: ReactNode;
    exact?: boolean;
    link: string;
}

const navigationItem: React.FC<Props> = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}>{props.children}</NavLink>
    </li>
);

export default navigationItem;