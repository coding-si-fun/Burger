import React from "react";
import Aux from '../../hoc/Aux';
import classes from './Layout.css'

interface Props {
    children:JSX.Element;
}

const layout = (props:Props)=>(
    <Aux>
        <div>Toolbar,SideFrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout