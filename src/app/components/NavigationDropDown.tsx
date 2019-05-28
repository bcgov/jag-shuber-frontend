import React from 'react';
import {
    NavDropdown
} from 'react-bootstrap';

interface NavigationDropDownProps {
    title: string;
    id: string;
    children?: any[];
}

class NavigationDropDown extends React.Component<NavigationDropDownProps, {}> {
    setActiveClass() {
        const { children = [] } = this.props;
        console.log(children[0])
        console.log(window.location)
        const childRouteIsActive = children.find(
            element => window.location.pathname.endsWith(element.props.path)
        )
        if (childRouteIsActive) {
            return true
        }
        return false;
    }

    render() {
        const { title, id, children } = this.props;

        return (
            <NavDropdown active={this.setActiveClass()} title={title} id={id}>
                {children}
            </NavDropdown>
        );
    }
}

export default NavigationDropDown;