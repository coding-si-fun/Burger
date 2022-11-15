import { checkPropTypes } from "prop-types";
import React, { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import {NavLink} from 'react-router-dom'

import classes from "./navigationItem.css"

interface Props {
    active: boolean;
    children:string;
    link:string;
 
}


const navigationItem:React.FC<Props> = (props) => (
    <li className={classes.NavigationItem} >
        <NavLink
          to={props.link} 
          exact={props.exact}
          activeClassName={classes.active}>
            { props.children }
        </NavLink>
    </li>
);

export default navigationItem