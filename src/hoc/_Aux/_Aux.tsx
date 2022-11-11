import React, { JSXElementConstructor, ReactElement } from "react";

interface Props{
    children:JSX.Element
}



const aux:React.FC<Props>=(props)=> props.children

export default aux;