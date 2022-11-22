import React from "react";
import Aux from '../_Aux/_Aux';
import classes from './Layout.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
class Layout extends React.Component {
    state = {
        showSideDrawer: false
    };
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };
    sideDrawerToggleClicked = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !this.state.showSideDrawer };
        });
    };
    render() {
        return (React.createElement(Aux, null,
            React.createElement(React.Fragment, null,
                React.createElement(Toolbar, { drawerToggleClicked: this.sideDrawerToggleClicked }),
                React.createElement(SideDrawer, { open: this.state.showSideDrawer, closed: this.sideDrawerClosedHandler }),
                React.createElement("main", { className: classes.Content }, this.props.children))));
    }
}
export default Layout;
//# sourceMappingURL=Layout.js.map