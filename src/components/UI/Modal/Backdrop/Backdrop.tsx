import React from 'react'
import classes from './Backdrop.css'

interface Props {
    show:boolean
}

const backdrop:React.FC<Props>= (props) =>{
    return props.show ? <div className={classes.Backdrop}></div> : null;
}
export default backdrop;