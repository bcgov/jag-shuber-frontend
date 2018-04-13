import * as React from 'react';
import {
    Nav, 
    Navbar,
    NavbarBrand
} from 'react-bootstrap';

import NavigationLink from './NavigationLink';

export interface NavigationProps {

}

export default class Navigation extends React.Component<NavigationProps, any> {
    render() {
        return (
            <div id="header-main" >
                <span className="logo">
                    <img className="hidden-xs" src="/img/bc_logo_transparent.png" />
                    <img className="visible-xs" src="/img/bc_logo_transparent-dark.png" />
                </span>
                              
                <Navbar staticTop={true} fluid={true} style={{borderRadius: 4}}>
                    <Navbar.Header color="#003366">
                        <NavbarBrand color="#003366">
                            Sheriff Scheduling System
                        </NavbarBrand>
                    </Navbar.Header>
                    <Nav bsStyle="tabs">
                        <NavigationLink exactMatch={true} to="/" label="Duty Roster" />
                        <NavigationLink to="/assignments/manage/default" label="Default Assignments" /> 
                        <NavigationLink to="/sheriffs/manage" label="Sheriffs" /> 
                        <NavigationLink to="/sheriffs/schedule" label="Schedule" />  
                    </Nav>
                </Navbar>
                
                <div style={{ zIndex: 1000 }} className="navigationRibbon hidden-xs" role="navigation" />
            </div>
        );
    }
}