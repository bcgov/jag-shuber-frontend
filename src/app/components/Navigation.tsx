import * as React from 'react';
import {
    Nav,
    Navbar,
    NavbarBrand,
    NavDropdown,
    MenuItem
} from 'react-bootstrap';
import NavigationLink from './NavigationLink';
import CurrentCourthouseSelector from '../containers/CurrentCourthouseSelector';

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

                        <NavDropdown title="Duty Roster" id="duty_roster_dropdown">
                            <MenuItem>
                                <NavigationLink exactMatch={true} to="/" label="Duty Roster" />
                            </MenuItem>
                            <MenuItem>
                                <NavigationLink to="/assignments/manage/default" label="Set-Up" />
                            </MenuItem>
                        </NavDropdown>
                        <NavDropdown title="Schedule" id="schedule_dropdown">
                            <MenuItem>
                                <NavigationLink to="/sheriffs/schedule" label="Manage Schedule" />
                            </MenuItem>
                            <MenuItem>
                                <NavigationLink to="/schedule/publishView" label="Distribute Schedule" />
                            </MenuItem>
                        </NavDropdown>
                        <NavigationLink to="/sheriffs/manage" label="My Team" />
                    </Nav>
                    <Nav pullRight={true} style={{ paddingTop: 13, paddingRight: 15 }}>
                        <CurrentCourthouseSelector />
                    </Nav>
                </Navbar>
            </div >
        );
    }
}