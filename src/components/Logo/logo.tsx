import React from "react";

import burgerLogo from "../../components/assets/images/burger-logo.png"
import classes from "./Logo.css"

const logo:React.FC = (props) =>(
    <div className={classes.Logo}>
       <img src={burgerLogo} alt="MyBurger" />
    </div>
)

export default logo