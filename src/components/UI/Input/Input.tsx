import React, { ChangeEventHandler, ClassAttributes, InputHTMLAttributes } from 'react';

import classes from './Input.css';

interface Config {
    [key: string]: string;
}

interface Props {
    elementConfig: {
        placeholder?: string;
        type?: string;
        options?: Config[];
    };
    elementType: any;
    changed: ChangeEventHandler<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>;
    onChange?: ChangeEventHandler<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>
    value: string | number | string[];
    invalid: boolean;
    shouldValidate: boolean | string | {}
    touched: boolean;
    label?: string;
}


const input: React.FC<Props> = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options ?
                        props.elementConfig.options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        )) : null}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default input;