import React, { Component, MouseEventHandler, ReactNode } from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

interface Props {
    show: boolean;
    children: ReactNode
    modalClosed: MouseEventHandler<HTMLDivElement>
}

const modal: React.FC<Props> = props => {

    // shouldComponentUpdate(nextProps: { show: boolean, children: ReactNode }, nextState: any) {
    //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    // }
    // componentWillUpdate() {
    // }

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Aux>
    )

}

export default React.memo(modal, (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children);