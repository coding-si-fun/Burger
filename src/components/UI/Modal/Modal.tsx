import React, { MouseEventHandler } from 'react';
import classes from './Modal.css'
import Aux from '../../../hoc/_Aux/_Aux'
import Backdrop from '../Modal/Backdrop/Backdrop'

interface Props{
    // modalClosed: MouseEventHandler<HTMLDivElement> | undefined;
    children:JSX.Element | null
    show:boolean
    modalClosed?:MouseEventHandler<HTMLDivElement>
    
}



class Modal extends React.Component<Props> {

    shouldComponentUpdate ( nextProps: { show: boolean; children: JSX.Element | JSX.Element[] | null; }, nextState:{show:boolean}) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
       
    }

    render () {
        return (
            <Aux>
                <>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
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