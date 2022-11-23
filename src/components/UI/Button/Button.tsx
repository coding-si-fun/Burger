import React, { MouseEventHandler } from "react"
import classes from "./Button.css"



interface Props {
    disabled: boolean | undefined;
    // disabled: boolean | undefined;
    btnType: string;
    clicked: MouseEventHandler<HTMLButtonElement> | undefined;
    children:JSX.Element | string;
}


const Buttons:React.FC<Props> =(props)=>{
    return (<button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
    >{props.children}
    </button>)
}

export default Buttons