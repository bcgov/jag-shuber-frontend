import React from 'react';
import {
    Nav,
    Navbar,
    NavbarBrand
} from 'react-bootstrap';
import NavigationLink from './NavigationLink';
import LocationSelector from '../containers/LocationSelector';
import bcLogo from '../assets/images/bc-logo-transparent.png';
import bcLogoDark from '../assets/images/bc-logo-transparent-dark.png';
import NavigationDropDown from './NavigationDropDown';

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
        },
        assignment: {
            path: '/assignments/manage/add',
            label: 'Add Assignment'
        },
        admin: {
            path: '#',
            label: 'Administration',
            children: {
                users: {
                    path: '/users/manage',
                    label: 'User Management'
                },
                roles: {
                    path: '/roles/manage',
                    label: 'Roles & Permissions'
                },
                codes: {
                    path: '/codes/manage',
                    label: 'Code Types'
                },
                audit: {
                    path: '/audit',
                    label: 'Audit Tables'
                }
            }
        },
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
                        <NavigationDropDown title="Duty Roster" id="duty_roster_dropdown">
                            <NavigationLink exactMatch={true} {...Navigation.Routes.dutyRoster.timeline} />
                            <NavigationLink {...Navigation.Routes.dutyRoster.setup} />
                        </NavigationDropDown>
                        <NavigationLink {...Navigation.Routes.assignment} />
                        <NavigationDropDown title="Shift Schedule" id="schedule_dropdown">
                            <NavigationLink {...Navigation.Routes.schedule.manage} />
                            <NavigationLink {...Navigation.Routes.schedule.distribute} />
                        </NavigationDropDown>
                        <NavigationLink {...Navigation.Routes.team} />
                        <NavigationDropDown title={Navigation.Routes.admin.label} id="admin_dropdown">
                            <NavigationLink {...Navigation.Routes.admin.children.users} />
                            <NavigationLink {...Navigation.Routes.admin.children.roles} />
                            <NavigationLink {...Navigation.Routes.admin.children.codes} />
                            <NavigationLink {...Navigation.Routes.admin.children.audit} />
                        </NavigationDropDown>
                    </Nav>
                    <Nav pullRight={true} style={{ paddingTop: 13, paddingRight: 15 }}>
                        <LocationSelector.Current />
                    </Nav>
                </Navbar>
            </div >
        );
    }
}
