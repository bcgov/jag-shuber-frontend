import * as React from 'react'
import {
    Nav
    , Navbar
    , NavbarBrand
} from 'react-bootstrap'

import NavigationLink from './NavigationLink'
const logo = require('../bc_logo_transparent.png');

export interface NavigationProps {

}

export default class Navigation extends React.Component<NavigationProps, any>{
    render() {
        return (
            <div id="header-main" style={{ zIndex: 1000 }}>                
                <Navbar>
                    <Navbar.Header>
                        <NavbarBrand href="https://gov.bc.ca">
                            <img src={logo} className="App-logo" alt="logo" style={{ textAlign: 'left' }} />
                        </NavbarBrand>
                    </Navbar.Header>
                    <Nav bsStyle='tabs'>
                        <NavigationLink exactMatch to="/" label="Home" />
                        <NavigationLink to="/stuff" label="Stuff" />
                        <NavigationLink to="/contact" label="Contact" />                        
                    </Nav>
                    <Nav pullRight>
                        <NavigationLink exactMatch to="/" label="Home" /> 
                    </Nav>
                </Navbar>
                <div style={{ zIndex: 1000 }} className="navigationRibbon hidden-xs" role="navigation" />
            </div>
        );
    }
}