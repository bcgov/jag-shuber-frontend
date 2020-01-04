import React from 'react';
import {
    Nav,
    Navbar,
    NavbarBrand,
    Badge, Glyphicon
} from 'react-bootstrap';
import NavigationLink from './NavigationLink';
import LocationSelector from '../containers/NavLocationSelector';
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
        assignment: {
            path: '/assignments/manage/add',
            label: 'Add Assignment'
        },
        team: {
            path: '/sheriffs/manage',
            label: 'My Team', // TODO: Switch between 'Manage' and 'My' prefix depending on the role...
            children: {
                users: {
                    path: '/users/manage',
                    label: 'Manage Users'
                },
                roles: {
                    path: '/roles/manage',
                    label: 'Define Roles & Access'
                },
                userRoles: {
                    path: '/roles/assign',
                    label: 'Assign User Roles'
                }
            }
        },
        courtrooms: {
            path: '/courtrooms/manage',
            label: 'Courtrooms'
        },
        system: {
            path: '#',
            label: 'System Settings',
            children: {
                codes: {
                    path: '/codes/manage',
                    label: 'Configure Lists'
                },
                components: {
                    path: '/components/manage',
                    label: 'Manage Components'
                },
                apis: {
                    path: '/apis/manage',
                    label: 'Manage API Scopes'
                }
            }
        },
        audit: {
            path: '/audit',
            label: 'Audit Records'
        }
    }

    render() {
        return (
            <div id="header-main" >
                <Navbar staticTop={true} fluid={true} style={{ maxWidth: '93%' }}>
                    <Navbar.Header color="#003366">
                        <NavbarBrand color="#003366">
                            <span className="logo">
                                <img className="hidden-xs" src={bcLogo} />
                                <img className="visible-xs" src={bcLogoDark} />
                            </span>
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
                        <NavigationLink {...Navigation.Routes.courtrooms}>&nbsp;<small><Glyphicon glyph="star" /></small></NavigationLink>
                        <NavigationDropDown title={Navigation.Routes.team.label} id="admin_dropdown">
                            <NavigationLink {...Navigation.Routes.team.children.users} />
                            <NavigationLink {...Navigation.Routes.team.children.userRoles}>&nbsp;<small><Glyphicon glyph="star" /></small></NavigationLink>
                            <NavigationLink {...Navigation.Routes.team.children.roles}>&nbsp;<small><Glyphicon glyph="star" /></small></NavigationLink>
                        </NavigationDropDown>
                        <NavigationDropDown title={Navigation.Routes.system.label} id="system_dropdown">
                            <NavigationLink {...Navigation.Routes.system.children.codes}>&nbsp;<small><Glyphicon glyph="star" /></small></NavigationLink>
                            <NavigationLink {...Navigation.Routes.system.children.components}>&nbsp;<small><Glyphicon glyph="star" /></small></NavigationLink>
                            <NavigationLink {...Navigation.Routes.system.children.apis}>&nbsp;<small><Glyphicon glyph="star" /></small></NavigationLink>
                        </NavigationDropDown>
                        <NavigationLink {...Navigation.Routes.audit} />
                    </Nav>
                    <Nav pullRight={true} style={{ paddingTop: 13, paddingRight: 15 }}>
                        <LocationSelector.Current />
                    </Nav>
                </Navbar>
            </div >
        );
    }
}
