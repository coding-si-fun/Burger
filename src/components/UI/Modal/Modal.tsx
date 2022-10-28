import React from 'react';
import classes from './Modal.css'
import Aux from '../../../hoc/_Aux'
import Backdrop from '../Modal/Backdrop/Backdrop'

interface Props{
    show:boolean 
    children:JSX.Element
}


const modal :React.FC<Props> = (props) =>(
    <Aux>
        <>
       <Backdrop show={props.show} />
    <div 
    className={classes.Modal}
    style={{transform:props.show ? 'translateY(0)':'translateY(-100vh)',opacity:props.show ? '1':'0'}}>
        {props.children} 
    </div>
    </>
    </Aux>
)
export default modal