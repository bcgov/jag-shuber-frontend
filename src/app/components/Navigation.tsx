import * as React from 'react';
import {
    Nav
    , Navbar
    , NavbarBrand
} from 'react-bootstrap';

import NavigationLink from './NavigationLink'

export interface NavigationProps {

}

export default class Navigation extends React.Component<NavigationProps, any>{
    render() {
        return (
            <div id="header-main" style={{ zIndex: 1000,marginBottom:10 }}>                
                <Navbar>
                    <Navbar.Header color="#003366" >
                        <NavbarBrand href="https://gov.bc.ca" color="#003366">
                            SHUBER
                        </NavbarBrand>
                    </Navbar.Header>
                    <Nav bsStyle='tabs'>
                        <NavigationLink exactMatch to="/" label="Home" />
                        <NavigationLink to="/settings" label="Settings" />
                        <NavigationLink to="/timeline" label="Timeline" />
                        <NavigationLink to="managesheriffs" label="Manage Sheriffs" />
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