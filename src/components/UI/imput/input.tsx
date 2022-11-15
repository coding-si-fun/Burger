import React from 'react'
import classes from './input.css'

const input=(props) => {
    let inputElement = null;
   const inputClasses=[classes.InputElement]
    if(props.invalid && props.shouldValidate && props.touched){
      inputClasses.push(classes.Invalid)
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
            className={ inputClasses.join(' ') } 
            {...props.elementConfig} 
            onChange={props.changed}
            defaultValue={props.value} />
            break;
        case('textarea'):
        inputElement = <textarea 
        className={ cinputClasses.join(' ') } 
        {...props.elementConfig} 
        onChange={props.changed}
        defaultValue={props.value}/>
        break;
        case('select'):
        inputElement = <select
        className={ inputClasses.join(' ') } 
        defaultValue={props.value}
        onChange={props.changed}>
           {props.elementConfig.options.map(option=>(
            <option key={option.value} value={option.value}>
                {option.displayValue}
            </option>
           ))}
        </select>
        break;
        default:
            inputElement =<input
             className={ inputClasses.join(' ') }
             {...props.elementConfig} 
             onChange={props.changed}
             defaultValue={props.value}/>
    }
    return (
    <div className={classes.Input}>
        <label className={classes.Label}>
            {props.label}
        </label>
        {inputElement}
    </div>
    )
}

export default input