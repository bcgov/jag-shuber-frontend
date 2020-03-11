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

    getActive() {
        const { children = [] } = this.props;
        const childRouteIsActive = children.find((element) => {
            return (element)
                ? window.location.pathname.endsWith(element.props.path)
                : false;
        });

        return childRouteIsActive;
    }

    render() {
        const { title, id, children } = this.props;

        return (
            <NavDropdown active={this.getActive()} title={title} id={id}>
                {children}
            </NavDropdown>
        );
    }
}

export default NavigationDropDown;
