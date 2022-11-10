import React from "react";
import Aux from '../../hoc/Aux/_Aux';
import classes from './Layout.css'
import Toolbar from "../Navigation/Toolbar/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"


interface Props{
    children:JSX.Element,
    open:boolean;
        
    
}

 class Layout extends React.Component<Props>{
    state = {
        showSideDrawer:true
    }
    sideDrawerClosedHandler = () =>{
        this.setState({ showSideDrawer:false })
    }
    sideDrawerToggleClicked = () => {
        this.setState((prevState) => {
            return {showSideDrawer:!this.state.showSideDrawer};
        });
    }
    render(){
        return(
        <Aux>
            <>
            <Toolbar drawerToggleClicked={ this.sideDrawerToggleClicked }/>
            <SideDrawer 
            open = {this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
            </>
            
        </Aux>
        )
    }
}

export default Layout