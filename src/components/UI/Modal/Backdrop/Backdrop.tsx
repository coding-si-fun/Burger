import React, { MouseEventHandler } from 'react'
import classes from './Backdrop.css'

interface Props {
    clicked: MouseEventHandler<HTMLDivElement> | undefined;
    // clicked:boolean;
    show:boolean;
 
}

const backdrop:React.FC<Props>= (props) =>{
    return props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null;
}
export default backdrop;