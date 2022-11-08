import React from "react";
import Aux from '../../hoc/_Aux';
import classes from './Layout.css'
import Toolbar from "../Navigation/Toolbar/Toolbar"

interface Props{
    children:JSX.Element
}

const layout:React.FC<Props>=(props)=>(
    <Aux>
        <>
        <Toolbar />
        <div>Toolbar,SideFrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
        </>
    </Aux>
);

export default layout