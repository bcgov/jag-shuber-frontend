import * as React from 'react'
import {
    Nav
    , Navbar
    , NavbarBrand
} from 'react-bootstrap'

import NavigationLink from './NavigationLink'
// const sheriffLogo = require('../logo.svg');
// const bcLogo = require('../bc_logo_transparent.png');

export interface NavigationProps {

}

export default class Navigation extends React.Component<NavigationProps, any>{
    render() {
        return (
            <div id="header-main" style={{ zIndex: 1000 }}>                
                <Navbar>
                    <Navbar.Header color="#003366" >
                        <NavbarBrand href="https://gov.bc.ca" color="#003366">
                            {/* <img src={bcLogo} alt="logo" className="App-logo" style={{ textAlign: 'left' }} /> */}
                           SHUBER
                            {/* <img src={sheriffLogo} alt="logo"  style={{ width: 50, textAlign: 'left' }} /> */}
                        </NavbarBrand>
                    </Navbar.Header>
                    <Nav bsStyle='tabs'>
                        <NavigationLink exactMatch to="/" label="Home" />
                        <NavigationLink to="/settings" label="Settings" />
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