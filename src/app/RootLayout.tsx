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
import {
  isLocationSet as isCurrentLocationSet,
  isLoggedIn as isUserLoggedIn,
  isLoadingToken as isLoadingUserToken,
  loadingTokenError
} from './modules/user/selectors';

// Import core layout components
import Navigation from './components/Navigation';

// Import pages
import AuditPage from './pages/Audit';
import AssignmentPage from './pages/Assignments';
import DefaultAssignmentsPage from './pages/DefaultAssignments';
import DutyRosterPage from './pages/DutyRoster';
import ManageCourtroomsPage from './pages/ManageCourtrooms';
import ManageCodesPage from './pages/ManageCodes';
import ManageComponentsPage from './pages/ManageComponents';
import ManageApisPage from './pages/ManageApis';
import ManageRolesPage from './pages/ManageRoles';
import ManageUserRolesPage from './pages/ManageUserRoles';
import ManageSheriffsPage from './pages/ManageSheriffs';
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

export interface LayoutStateProps {
  isLocationSet?: boolean;
  isLoggedIn?: boolean;
  isLoadingToken?: boolean;
  tokenLoadingError?: any;
}

export interface LayoutDispatchProps {
}

class Layout extends React.Component<LayoutStateProps & LayoutDispatchProps> {

  componentWillReceiveProps(nextProps: LayoutStateProps) {
    const { isLoadingToken: wasLoadingToken } = nextProps;
    const { isLoadingToken = true, isLoggedIn = false, tokenLoadingError } = this.props;
    if (wasLoadingToken && !isLoadingToken && isLoggedIn && tokenLoadingError == undefined) {
      window.location.reload();
    }
  }

  render() {
    const {
      isLocationSet = false,
      tokenLoadingError,
      isLoggedIn,
      isLoadingToken = true
    } = this.props;
    if (isLoadingToken) {
      return null;
    }
    if (!isLoggedIn && tokenLoadingError) {
      return (
        <div style={{ width: 300, margin: 'auto', marginTop: 200, position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
          <Alert bsStyle="danger">
            Looks like your session may have expired, please reload the page.
            <br/>
            <Button style={{marginTop:10}} onClick={() => window.location.reload()} >Click to reload</Button>
          </Alert>
        </div>
      );
    }
    return (
      <Router basename={resolveAppUrl('')}>
        <div className="App">
          <CustomDragLayer/>
          <ToastManager />
          <div className="headerArea">
            <Navigation />
          </div>
          {!isLocationSet && (
            <div className="mainArea">
              <Well
                style={{
                  backgroundColor: 'white',
                  maxWidth: '85%',
                  minWidth: 800,
                  height: '100%',
                  margin: 'auto',
                  borderRadius: 0
                }}
              >
                <div style={{ paddingTop: 10 }}>
                  <h1>Select your Location</h1>
                  <LocationSelector.Current />
                </div>
              </Well>
            </div>
          )}

          {isLocationSet && (
            <div className="mainArea">
              <Route exact={true} path={Navigation.Routes.dutyRoster.timeline.path} component={DutyRosterPage} />
              <Route path={Navigation.Routes.schedule.manage.path} component={SchedulingPage} />
              <Route path={Navigation.Routes.schedule.distribute.path} component={PublishSchedulePage} />
              <Route path={Navigation.Routes.dutyRoster.setup.path} component={DefaultAssignmentsPage} />
              <Route path={Navigation.Routes.assignment.path} component={AssignmentPage} />
              <Route path={Navigation.Routes.team.path} component={ManageSheriffsPage} />
              <Route path={Navigation.Routes.team.children.roles.path} component={ManageRolesPage} />
              <Route path={Navigation.Routes.team.children.users.path} component={ManageUsersPage} />
              <Route path={Navigation.Routes.team.children.userRoles.path} component={ManageUserRolesPage} />
              <Route path={Navigation.Routes.system.children.courtrooms.path} component={ManageCourtroomsPage} />
              <Route path={Navigation.Routes.system.children.codes.path} component={ManageCodesPage} />
              <Route path={Navigation.Routes.system.children.components.path} component={ManageComponentsPage} />
              <Route path={Navigation.Routes.audit.path} component={AuditPage} />
              <Route path={Navigation.Routes.system.children.apis.path} component={ManageApisPage} />
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
  return {
    isLocationSet: isCurrentLocationSet(state),
    isLoggedIn: isUserLoggedIn(state),
    isLoadingToken: isLoadingUserToken(state),
    tokenLoadingError: loadingTokenError(state)
  };
};

const mapDispatchToProps = {};

const connectedLayout = connect<LayoutStateProps, LayoutDispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
// Make our Layout the root of the Drag Drop Context
export default DragDropContext(HTML5Backend)(connectedLayout);
