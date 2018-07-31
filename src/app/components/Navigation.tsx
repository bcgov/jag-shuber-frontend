import React from 'react';
import {
    Nav,
    Navbar,
    NavbarBrand,
    NavDropdown
} from 'react-bootstrap';
import NavigationLink from './NavigationLink';
import CurrentCourthouseSelector from '../containers/SystemCurrentCourthouseSelector';
import bcLogo from '../assets/images/bc-logo-transparent.png';
import bcLogoDark from '../assets/images/bc-logo-transparent-dark.png';

export interface NavigationProps {

}

export default class Navigation extends React.Component<NavigationProps, any> {
    static Routes = {
        dutyRoster: {
            timeline: {
                path: '/',
                label: 'Duty Roster'
            },
            setup: {
                path: '/assignments/manage/default',
                label: 'Set-up'
            }
        },
        schedule: {
            manage: {
                path: '/sheriffs/schedule',
                label: 'Manage Schedule'
            },
            distribute: {
                path: '/schedule/publishView',
                label: 'Distribute Schedule'
            }
        },
        team: {
            path: '/sheriffs/manage',
            label: 'My Team'
        }
    }
    render() {
        return (
            <div id="header-main" >
                <span className="logo">
                    <img className="hidden-xs" src={bcLogo} />
                    <img className="visible-xs" src={bcLogoDark} />
                </span>


                <Navbar staticTop={true} fluid={true} style={{ borderRadius: 4 }}>
                    <Navbar.Header color="#003366">
                        <NavbarBrand color="#003366">
                            Sheriff Scheduling System
                        </NavbarBrand>
                    </Navbar.Header>
                    <Nav bsStyle="tabs">
                        <NavDropdown title="Duty Roster" id="duty_roster_dropdown">
                            <NavigationLink exactMatch={true} {...Navigation.Routes.dutyRoster.timeline} />
                            <NavigationLink {...Navigation.Routes.dutyRoster.setup} />
                        </NavDropdown>
                        <NavDropdown title="Shift Schedule" id="schedule_dropdown">
                            <NavigationLink {...Navigation.Routes.schedule.manage} />
                            <NavigationLink {...Navigation.Routes.schedule.distribute} />
                        </NavDropdown>
                        <NavigationLink {...Navigation.Routes.team} />
                    </Nav>
                    <Nav pullRight={true} style={{ paddingTop: 13, paddingRight: 15 }}>
                        <CurrentCourthouseSelector />
                    </Nav>
                </Navbar>
            </div >
        );
    }
}