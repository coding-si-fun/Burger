import React, { MouseEventHandler } from "react";
import Logo from "../../Logo/logo";
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from "./sideDrawer.css"
import Backdrop from "../../UI/Modal/Backdrop/Backdrop";
import Aux from '../../../hoc/Aux/_Aux'

interface Props {
    closed: MouseEventHandler<HTMLDivElement> | undefined;
    open: boolean;    
}


const sideDrawer:React.FC<Props> =(props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close]
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <Aux>
            <>
            <Backdrop show={ props.open } clicked={props.closed }/>
                <div className={attachedClasses.join(' ')}>
                    <div className={ classes.LogoSide }>
                        <Logo />
                    </div>
                    <nav>
                        <NavigationItems />
                    </nav>
                </div>
            </>
        </Aux>
    )
}

export default sideDrawer