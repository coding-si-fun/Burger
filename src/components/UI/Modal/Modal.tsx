import React, { MouseEventHandler } from 'react';
import classes from './Modal.css'
import Aux from '../../../hoc/Aux/_Aux'
import Backdrop from '../Modal/Backdrop/Backdrop'

interface Props{
    // modalClosed: MouseEventHandler<HTMLDivElement> | undefined;
    children:JSX.Element
    show:boolean;
    
}



class Modal extends React.Component<Props> {

    shouldComponentUpdate ( nextProps: { show: boolean; }, nextState:{show:boolean}) {
        console.log(nextProps,"and also", nextState)
        return nextProps.show !== this.props.show;
       
    }

    // componentWillUpdate () {
    //     console.log('[Modal] WillUpdate');
    // }

    render () {
        return (
            <Aux>
                <>
                <Backdrop show={this.props.show} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
                </>
            </Aux>
        )
    }
}

export default Modal;