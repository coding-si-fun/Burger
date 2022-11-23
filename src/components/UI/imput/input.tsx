import React, { ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'
import classes from './input.css'
import {RouteComponentProps} from "react-router-dom"



interface Props extends RouteComponentProps  {
    shouldValidate: {}
   
    changed:(event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>)=>void
    label?: ReactNode;
    touched:boolean;
    value?: string;
    elementConfig: {
        options:[{
            displayValue:string,
            value:string
        },
        {
            displayValue:string,
            value:string
        }]}
    elementType: string;
    invalid:boolean;
  
    // options:{
    //     key:string;
    //     value:string
    // }
   
}

const input:React.FC<Props>=(props) => {
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
            value={props.value} />
            break;
        case('textarea'):
        inputElement = <textarea 
        className={ inputClasses.join(' ') } 
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed}
        />
        break;
        case('select'):
        inputElement = <select
        className={ inputClasses.join(' ') } 
        value={props.value}
        onChange={props.changed}
        >
           {props.elementConfig.options.map( (option)=>(
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
             value={props.value}/>
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