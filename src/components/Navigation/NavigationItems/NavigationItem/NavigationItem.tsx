import { checkPropTypes } from "prop-types";
import React, { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

import classes from "./navigationItem.css"

interface Props {
    active: boolean;
    children:string;
    link:string;
 
}


const navigationItem:React.FC<Props> = (props) => (
    <li className={classes.NavigationItem} >
        <a  href={props.link} className={props.active ? classes.active : undefined } >{ props.children }</a>
    </li>
);

export default navigationItem