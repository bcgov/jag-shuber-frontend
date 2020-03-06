import React from 'react';
import {
    Nav,
    Navbar,
    NavbarBrand,
    NavDropdown,
    Dropdown,
    MenuItem,
    Badge,
    Glyphicon,
    Image
} from 'react-bootstrap';
import NavigationLink from './NavigationLink';
import LocationSelector from '../containers/NavLocationSelector';
import bcLogo from '../assets/images/bc-logo-transparent-no-underline.png';
import bcLogoDark from '../assets/images/bc-logo-transparent-dark.png';
import NavigationDropDown from './NavigationDropDown';
import avatarImg from '../assets/images/avatar.png';
import SheriffRankDisplay from '../containers/SheriffRankDisplay';
import SheriffDisplay from '../containers/SheriffDisplay';

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
        system: {
            path: '#',
            label: 'System',
            children: {
                /* courtrooms: {
                    path: '/courtrooms/manage',
                    label: 'Add / Remove Courtrooms'
                }, */
                leaveTypes: {
                    path: '/codes/manage',
                    label: 'Leave & Training Types'
                },
                workSectionRoles: {
                    path: '/workSectionRoles/manage',
                    label: 'Court & Jail Roles'
                },
                assignmentTypes: {
                    path: '/assignmentTypes/manage',
                    label: 'Assignment Types'
                },
                components: {
                    path: '/components/manage',
                    label: 'Define Components'
                },
                apis: {
                    path: '/apis/manage',
                    label: 'Define API Scopes'
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
                        <NavigationLink {...Navigation.Routes.system.children.assignmentTypes} />
                        <NavigationDropDown title={Navigation.Routes.team.label} id="admin_dropdown">
                            <NavigationLink {...Navigation.Routes.team.children.users} />
                            <NavigationLink {...Navigation.Routes.team.children.userRoles} />
                            <NavigationLink {...Navigation.Routes.team.children.roles} />
                        </NavigationDropDown>
                        <NavigationDropDown title={Navigation.Routes.system.label} id="system_dropdown">
                            <NavigationLink {...Navigation.Routes.system.children.leaveTypes} />
                            <NavigationLink {...Navigation.Routes.system.children.components} />
                            <NavigationLink {...Navigation.Routes.system.children.apis} />
                        </NavigationDropDown>
                        {/*<NavigationLink {...Navigation.Routes.audit} />*/}
                    </Nav>
                    <Nav pullRight={true} style={{ paddingTop: 13, paddingRight: 15 }}>
                        <div className="flex-row-wrap">
                            <LocationSelector.Current />
                            <Dropdown id="user-profile-menu" className="">
                                <Dropdown.Toggle className="user-profile-menu-toggle btn-transparent">
                                     <Image
                                        style={{ marginLeft: '30px' }}
                                        src={avatarImg}
                                        circle={true}
                                        width="32"
                                        height="32"
                                     />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <SheriffDisplay
                                        sheriffId={''}
                                        RenderComponent={({ sheriff: {
                                            firstName = 'George',
                                            lastName = 'Thurman',
                                            imageUrl = '',
                                            badgeNo = '123',
                                            rankCode = 'STAFFINSPECTOR'
                                        } = {} }) =>
                                            (
                                                <div className="sheriff-profile-header">
                                                    {/* <Image
                                                        src={imageUrl ? imageUrl : avatarImg}
                                                        circle={true}
                                                        width="115"
                                                        height="115"
                                                    /> */}
                                                    <div style={{ marginTop: 30, fontSize: 14 }}>#{badgeNo}</div>
                                                    <div style={{ fontWeight: 'bold', fontSize: 18 }}>
                                                        {firstName.toUpperCase()} {lastName.toUpperCase()}
                                                    </div>
                                                    <div style={{ fontSize: 14 }}><SheriffRankDisplay code={rankCode} /></div>
                                                </div>
                                            )
                                        }
                                    />
                                    <hr />
                                    <MenuItem
                                        style={{ textAlign: 'center' }}
                                        onClick={() => {
                                            // tslint:disable-next-line:max-line-length
                                            window.location.href = `https://logon.gov.bc.ca/clp-cgi/logoff.cgi?returl=${window.location.href}`;
                                        }}
                                    >
                                        Logout
                                    </MenuItem>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Nav>
                </Navbar>
            </div >
        );
    }
}
