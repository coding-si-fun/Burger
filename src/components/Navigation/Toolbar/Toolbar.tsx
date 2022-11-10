import React, { MouseEventHandler } from "react";
import classes from "./Toolbar.css"
import Logo from "../../Logo/logo"
import NavigationItems from "../../Navigation/NavigationItems/NavigationItems"
import DrawerToggle from '../SideDrawer/DrawerToggle/toggle'

interface Props {
    drawerToggleClicked: MouseEventHandler<HTMLDivElement> | undefined;
}

const toolbar:React.FC <Props>= (props) => {
    return (
    <header className={classes.Toolbar}>
     <DrawerToggle clicked={props.drawerToggleClicked  } />
        <div className={classes.Logo}>
        <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
    )
}


export default toolbar