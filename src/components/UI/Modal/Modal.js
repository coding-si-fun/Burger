import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/_Aux/_Aux';
import Backdrop from '../Modal/Backdrop/Backdrop';
class Modal extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    render() {
        return (React.createElement(Aux, null,
            React.createElement(React.Fragment, null,
                React.createElement(Backdrop, { show: this.props.show, clicked: this.props.modalClosed }),
                React.createElement("div", { className: classes.Modal, style: {
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    } }, this.props.children))));
    }
}
export default Modal;
//# sourceMappingURL=Modal.js.map