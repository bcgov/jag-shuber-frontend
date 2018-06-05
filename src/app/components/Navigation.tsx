import * as React from 'react';
import {
    Nav,
    Navbar,
    NavbarBrand, 
    NavDropdown, 
    MenuItem
} from 'react-bootstrap';
import NavigationLink from './NavigationLink';
import CurrentCourthouseDisplay from '../containers/CurrentCourthouseDisplay';

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

                <Navbar staticTop={true} fluid={true} style={{ borderRadius: 4 }}>
                    <Navbar.Header color="#003366">
                        <NavbarBrand color="#003366">
                            Sheriff Scheduling System
                        </NavbarBrand>
                    </Navbar.Header>
                    <Nav bsStyle="tabs">
                        <NavigationLink exactMatch={true} to="/" label="Duty Roster" />
                        <NavDropdown title="Schedule" id="schedule_dropdown">
                            <MenuItem>
                                <NavigationLink to="/sheriffs/schedule" label="Manage Schedule" />
                            </MenuItem>
                            <MenuItem>
                                <NavigationLink to="/schedule/publishView" label="Distribute Schedule" />
                            </MenuItem>
                        </NavDropdown>
                        <NavigationLink to="/sheriffs/manage" label="My Team" />
                        <NavigationLink to="/assignments/manage/default" label="Duty Roster Set-Up" />
                    </Nav>
                    <Nav pullRight={true} style={{ paddingTop: 13, paddingRight: 10 }}>
                        <span><b>Current Courthouse:</b> <CurrentCourthouseDisplay /></span>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}