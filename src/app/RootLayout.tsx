import React from 'react';
import { connect } from 'react-redux';
import { RootState } from './store';
import {
    Route,
    BrowserRouter as Router
} from 'react-router-dom';
import {
    DragDropContext
} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Well, Alert, Button } from 'react-bootstrap';

// Import generic infrastructure constructs and modules
import resolveAppUrl from './infrastructure/resolveAppUrl';
import CustomDragLayer from './infrastructure/DragDrop/CustomDragLayer';

import { userHasBasicAuth } from './plugins/permissionUtils';

import {
    isLocationSet as isCurrentLocationSet,
    isLoggedIn as isUserLoggedIn,
    isLoadingToken as isLoadingUserToken,
    loadingTokenError, currentUserRoleScopes, getCurrentUserToken, getCurrentUser,
} from './modules/user/selectors';

import {
    doLogout
} from './modules/user/actions';

// Import core layout components
// import Navigation from './components/Navigation';
// Use the new connected Navigation container
import NavigationComponent from './components/Navigation';
import Navigation from './containers/Navigation';

// Import pages
import AuditPage from './pages/Audit';
import AssignmentPage from './pages/Assignments';
import DefaultAssignmentsPage from './pages/DefaultAssignments';
import DutyRosterPage from './pages/DutyRoster';
// import ManageCourtroomsPage from './pages/ManageCourtrooms';
import ManageWorkSectionRolesPage from './pages/ManageWorkSectionRoles';
import ManageLeaveTypesPage from './pages/ManageCodes';
import ManageAssignmentTypesPage from './pages/ManageAssignmentTypes';
import ManageComponentsPage from './pages/ManageComponents';
import ManageApisPage from './pages/ManageApis';
import ManageRolesPage from './pages/ManageRoles';
import ManageUserRolesPage from './pages/ManageUsers';
import ManageSheriffsPage from './pages/ManageSheriffs';
import ManageTeamPage from './pages/ManageTeam';
import ManageUsersPage from './pages/ManageUsers';
import SchedulingPage from './pages/Scheduling';
import PublishSchedulePage from './pages/PublishSchedule/PublishSchedule';

// Import container components
import ToastManager from './components/ToastManager/ToastManager';
import LocationSelector from './containers/NavLocationSelector';
import Footer from './components/Footer/Footer';

// Import app-level modal components
import ConnectedConfirmationModal from './containers/ConfirmationModal';
import AssignmentScheduleAddModal from './containers/AssignmentScheduleAddModal';
import AssignmentScheduleEditModal from './containers/AssignmentScheduleEditModal';
import AssignmentDutyEditModal from './containers/AssignmentDutyEditModal';
import AssignmentSheriffDutyReassignmentModal from './containers/AssignmentSheriffDutyReassignmentModal';
import DutyRosterToolsModal from './containers/DutyRosterToolsModal';
import ScheduleShiftCopyModal from './containers/ScheduleShiftCopyModal';
import ScheduleShiftAddModal from './containers/ScheduleShiftAddModal';
import ScheduleShiftMultiEditModal from './containers/ScheduleMultiShiftEditModal';
import SheriffProfileModal from './containers/SheriffProfileModal';
import SheriffProfileCreateModal from './containers/SheriffProfileCreateModal';
import ManageWorkSectionRoles from './pages/ManageWorkSectionRoles';
import { IdType, User } from './api';
import { getUserByAuthId } from './modules/users/selectors';
import { TOKEN_COOKIE_NAME, TokenPayload } from 'jag-shuber-api';

export interface LayoutStateProps {
    isLocationSet?: boolean;
    isLoggedIn?: boolean;
    isLoadingToken?: boolean;
    tokenLoadingError?: any;
    currentUserRoleScopes?: any;
    currentUserToken?: TokenPayload;
    currentUser?: User;
}

export interface LayoutDispatchProps {
    logout?: Function; // TODO: Type this better...
    getUserByAuthId?: (userAuthId: IdType) => any;
}

class Layout extends React.Component<LayoutStateProps & LayoutDispatchProps> {
    componentWillReceiveProps(nextProps: LayoutStateProps) {
        if (nextProps !== this.props) {
            const { isLoadingToken: wasLoadingToken } = nextProps;
            const { isLoadingToken = true, isLoggedIn = false, tokenLoadingError } = this.props;
            if (wasLoadingToken && !isLoadingToken && isLoggedIn && tokenLoadingError === undefined) {
                window.location.reload();
            }
        }
    }

    render() {
        const {
            isLocationSet = false,
            tokenLoadingError,
            isLoggedIn,
            isLoadingToken = true,
            logout,
            // tslint:disable-next-line:no-shadowed-variable
            currentUserRoleScopes = {
                appScopes: {},
                authScopes: []
            }
        } = this.props;

        if (isLoadingToken) {
            return null;
        }

        const userHasBasicAuthorization = userHasBasicAuth(currentUserRoleScopes);

        if (!isLoggedIn && tokenLoadingError) {
            return (
                <div style={{ width: 300, margin: 'auto', marginTop: 200, position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
                    <Alert bsStyle="danger">
                        Looks like your session may have expired, please reload the page.
                        <br/>
                        <Button style={{marginTop: 10}} onClick={() => window.location.reload()} >Click to reload</Button>
                    </Alert>
                </div>
            );
        } // Use this if you want to ONLY show the unauthorized message
        /* else if (!userHasBasicAuthorization) {
            return (
                <div className="mainArea">
                    <Well
                        style={{
                            backgroundColor: 'white',
                            maxWidth: '85%',
                            height: '100%',
                            margin: 'auto',
                            borderRadius: 0
                        }}
                    >
                        <div style={{ paddingTop: 10 }}>
                            <Alert bsStyle="danger">
                                <h3 style={{ color: '#d2322d' }}>Unauthorized</h3>
                                <p>Sorry, you do not have the required access to view this content. Please contact your system administrator.</p>
                            </Alert>
                        </div>
                    </Well>
                </div>
            );
        } */

        return (
            <Router basename={resolveAppUrl('')}>
                <div className="App">
                    <CustomDragLayer/>
                    <ToastManager />
                    <div className="headerArea">
                        <Navigation
                            onLogoutClicked={() => {
                                if (logout) logout();
                            }}
                        />
                    </div>

                    {!userHasBasicAuthorization && (
                        <div className="mainArea">
                            <Well
                                style={{
                                    backgroundColor: 'white',
                                    maxWidth: '85%',
                                    height: '100%',
                                    margin: 'auto',
                                    borderRadius: 0
                                }}
                            >
                                <div style={{ paddingTop: 10 }}>
                                    <Alert bsStyle="danger">
                                        <h3 style={{ color: '#d2322d' }}>Unauthorized</h3>
                                        <p>Sorry, you do not have the required access to view this content. Please contact your system administrator.</p>
                                    </Alert>
                                </div>
                            </Well>
                        </div>
                    )}

                    {!isLocationSet && userHasBasicAuthorization && (
                        <div className="mainArea">
                            <Well
                                style={{
                                    backgroundColor: 'white',
                                    maxWidth: '85%',
                                    height: '100%',
                                    margin: 'auto',
                                    borderRadius: 0,
                                    border: '1px solid grey'
                                }}
                            >
                                <div style={{ paddingTop: 10 }}>
                                    <h1>Select your Location</h1>
                                    <LocationSelector.Current />
                                </div>
                            </Well>
                        </div>
                    )}

                    {isLocationSet && userHasBasicAuthorization && (
                        <div className="mainArea">
                            <Route exact={true} path={NavigationComponent.Routes.dutyRoster.timeline.path} component={DutyRosterPage} />
                            <Route path={NavigationComponent.Routes.schedule.manage.path} component={SchedulingPage} />
                            <Route path={NavigationComponent.Routes.schedule.distribute.path} component={PublishSchedulePage} />
                            <Route path={NavigationComponent.Routes.dutyRoster.setup.path} component={DefaultAssignmentsPage} />
                            <Route path={NavigationComponent.Routes.assignment.path} component={AssignmentPage} />
                            <Route path={NavigationComponent.Routes.team.path} component={ManageSheriffsPage} />
                            <Route path={NavigationComponent.Routes.team.children.roles.path} component={ManageRolesPage} />
                            <Route path={NavigationComponent.Routes.team.children.team.path} component={ManageTeamPage} />
                            <Route path={NavigationComponent.Routes.team.children.users.path} component={ManageUsersPage} />
                            <Route path={NavigationComponent.Routes.types.children.leaveTypes.path} component={ManageLeaveTypesPage} />
                            <Route path={NavigationComponent.Routes.types.children.assignmentTypes.path} component={ManageAssignmentTypesPage} />
                            <Route path={NavigationComponent.Routes.system.children.components.path} component={ManageComponentsPage} />
                            <Route path={NavigationComponent.Routes.audit.path} component={AuditPage} />
                            <Route path={NavigationComponent.Routes.system.children.apis.path} component={ManageApisPage} />
                            <DutyRosterToolsModal />
                            <AssignmentDutyEditModal />
                            <SheriffProfileModal />
                            <SheriffProfileCreateModal />
                            <ScheduleShiftCopyModal />
                            <ScheduleShiftAddModal />
                            <AssignmentScheduleAddModal />
                            <AssignmentScheduleEditModal />
                            <ConnectedConfirmationModal />
                            <AssignmentSheriffDutyReassignmentModal />
                            <ScheduleShiftMultiEditModal />
                        </div>
                    )}
                    <div className="footerArea">
                        <Footer />
                    </div>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return (!sessionStorage.getItem(TOKEN_COOKIE_NAME))
        ? {
            isLocationSet: isCurrentLocationSet(state),
            isLoggedIn: isUserLoggedIn(state),
            isLoadingToken: isLoadingUserToken(state),
            tokenLoadingError: loadingTokenError(state),
            currentUserRoleScopes: currentUserRoleScopes(state),
            currentUserToken: getCurrentUserToken(state),
            // tslint:disable-next-line:no-shadowed-variable
            currentUser: {} as User
        }
        : {
            isLocationSet: isCurrentLocationSet(state),
            isLoggedIn: isUserLoggedIn(state),
            isLoadingToken: isLoadingUserToken(state),
            tokenLoadingError: loadingTokenError(state),
            currentUserRoleScopes: currentUserRoleScopes(state),
            currentUserToken: getCurrentUserToken(state),
            // Don't get the current user unless there's a token!
            currentUser: getCurrentUser(state),
        };
};

const mapDispatchToProps = {
    logout: doLogout
};

const connectedLayout = connect<LayoutStateProps, LayoutDispatchProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)(Layout);
// Make our Layout the root of the Drag Drop Context
export default DragDropContext(HTML5Backend)(connectedLayout);
