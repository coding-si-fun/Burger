import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label:'Salad', type:"salad"},
    {label:'Beacon', type:'beacon'},
    {label:'Cheese', type:'cheese'} ,
    {label:'Meat', type:'meat'},
]

const buildControls:React.FC  = (props) => (
    <div className={classes.BuildControls}>
        { controls.map((ctrl)=> (
            <BuildControl key={ctrl.label} label={ctrl.label} />
        ))}
    </div>
)

export default buildControls