import * as React from 'react';
import {
    Nav, 
    Navbar,
    NavbarBrand
} from 'react-bootstrap';

import NavigationLink from './NavigationLink';
import CourthouseSelector from '../containers/CourthouseSelector';

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
                        <NavigationLink to="/sheriffs/schedule" label="Schedule" /> 
                        <NavigationLink to="/sheriffs/manage" label="My Team" /> 
                        <NavigationLink to="/assignments/manage/default" label="Duty Roster Set-Up" />     
                    </Nav>
                    <Nav pullRight={true} style={{paddingTop: 15, paddingRight: 10}}>
                        <CourthouseSelector />
                    </Nav>
                </Navbar>
                <div style={{ zIndex: 1000 }} className="navigationRibbon hidden-xs" role="navigation" />
            </div>
        );
    }
}