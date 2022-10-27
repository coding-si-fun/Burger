import React from "react";

import classes from './BuildControl.css'
interface Props {
    label:string;
}
interface SS{
    props:Props
}


const buildControl:React.FC<Props> = ({props}) =>(
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less}>Less</button>
        <button className={classes.More}>More</button>
     
    </div>
    );
export default buildControl