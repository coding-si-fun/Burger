import React, { MouseEventHandler } from "react";

import classes from './DrawerToggle.css'

interface Props {
    clicked: MouseEventHandler<HTMLDivElement> | undefined;

}

const drowerToggle:React.FC<Props> = (props) => (
    <div className={ classes.DrawerToggle } onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
   

)

export default drowerToggle