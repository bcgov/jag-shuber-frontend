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
            <div id="header-main" >
                <span className="logo">
                    <img className="hidden-xs" src="/img/bc_logo_transparent.png" />
                    <img className="visible-xs" src="/img/bc_logo_transparent-dark.png" />
                </span>
                              
                <Navbar  staticTop fluid style={{borderRadius:4}}>
                    <Navbar.Header color="#003366">
                        <NavbarBrand href="https://gov.bc.ca" color="#003366">
                            SHUBER
                        </NavbarBrand>
                    </Navbar.Header>
                    <Nav bsStyle='tabs'>
                        <NavigationLink exactMatch to="/" label="Timeline" />
                        <NavigationLink to="/sheriffs/manage" label="Manage Sheriffs" />   
                        <NavigationLink to="/assignments/manage/default" label="Manage Default Assignments" />                        
                    </Nav>
                </Navbar>
                
                <div style={{ zIndex: 1000 }} className="navigationRibbon hidden-xs" role="navigation" />
            </div>
        );
    }
}