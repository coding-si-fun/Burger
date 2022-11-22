import React, { Component } from 'react';
import classes from './BurgerIngrediant.css';
class BurgerIngredient extends Component {
    render() {
        let ingredient = null;
        switch (this.props.type) {
            case ('bread-bottom'):
                ingredient = React.createElement("div", { className: classes.BreadBottom });
                break;
            case ('bread-top'):
                ingredient = (React.createElement("div", { className: classes.BreadTop },
                    React.createElement("div", { className: classes.Seeds1 }),
                    React.createElement("div", { className: classes.Seeds2 })));
                break;
            case ('meat'):
                ingredient = React.createElement("div", { className: classes.Meat });
                break;
            case ('cheese'):
                ingredient = React.createElement("div", { className: classes.Cheese });
                break;
            case ('bacon'):
                ingredient = React.createElement("div", { className: classes.Bacon });
                break;
            case ('salad'):
                ingredient = React.createElement("div", { className: classes.Salad });
                break;
            default:
                ingredient = null;
        }
        return ingredient;
    }
}
// BurgerIngredient.propTypes = {
//     type: PropTypes.string.isRequired
// };
export default BurgerIngredient;
//# sourceMappingURL=BurgerIngrediant.js.map