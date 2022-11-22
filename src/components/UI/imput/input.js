import React from 'react';
import classes from './input.css';
const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = React.createElement("input", { className: inputClasses.join(' '), ...props.elementConfig, onChange: props.changed, value: props.value });
            break;
        case ('textarea'):
            inputElement = React.createElement("textarea", { className: inputClasses.join(' '), ...props.elementConfig, value: props.value, onChange: props.changed });
            break;
        case ('select'):
            inputElement = React.createElement("select", { className: inputClasses.join(' '), value: props.value, onChange: props.changed }, props.elementConfig.options.map((option) => (React.createElement("option", { key: option.value, value: option.value }, option.displayValue))));
            break;
        default:
            inputElement = React.createElement("input", { className: inputClasses.join(' '), ...props.elementConfig, onChange: props.changed, value: props.value });
    }
    return (React.createElement("div", { className: classes.Input },
        React.createElement("label", { className: classes.Label }, props.label),
        inputElement));
};
export default input;
//# sourceMappingURL=input.js.map