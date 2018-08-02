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
import Navigation from './components/Navigation';
import DutyRoster from './pages/DutyRoster';
import ManageSheriffs from './pages/ManageSheriffs';
import DefaultAssignments from './pages/DefaultAssignments';
import Scheduling from './pages/Scheduling';
import AssignmentDutyEditModal from './containers/AssignmentDutyEditModal';
import CurrentCourthouseSelector from './containers/SystemCurrentCourthouseSelector';
import { Well, Alert, Button } from 'react-bootstrap';
import SheriffProfileModal from './containers/SheriffProfileModal';
import ScheduleShiftCopyModal from './containers/ScheduleShiftCopyModal';
import ScheduleShiftAddModal from './containers/ScheduleShiftAddModal';
import AssignmentSheriffDutyReassignmentModal from './containers/AssignmentSheriffDutyReassignmentModal';
import PublishSchedule from './pages/PublishSchedule/PublishSchedule';
import Footer from './components/Footer/Footer';
import {
  isCourthouseSet as isCurrentCourthouseSet,
  isLoggedIn as isUserLoggedIn,
  isLoadingToken as isLoadingUserToken,
  loadingTokenError
} from './modules/user/selectors';
import ToastManager from './components/ToastManager/ToastManager';
import ConnectedConfirmationModal from './containers/ConfirmationModal';
import SheriffProfileCreateModal from './containers/SheriffProfileCreateModal';
import resolveAppUrl from './infrastructure/resolveAppUrl';

export interface LayoutStateProps {
  isCourthouseSet?: boolean;
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
      isCourthouseSet = false,
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
          <ToastManager />
          <div className="headerArea">
            <Navigation />
          </div>
          {!isCourthouseSet && (
            <div className="mainArea">
              <Well
                style={{
                  backgroundColor: 'white',
                  maxWidth: '80%',
                  minWidth: 800,
                  height: '100%',
                  margin: 'auto'
                }}
              >
                <div style={{ paddingTop: 10 }}>
                  <h1>Select your Location</h1>
                  <CurrentCourthouseSelector />
                </div>
              </Well>
            </div>
          )}

          {isCourthouseSet && (
            <div className="mainArea">
              <Route exact={true} path={Navigation.Routes.dutyRoster.timeline.path} component={DutyRoster} />
              <Route path={Navigation.Routes.schedule.manage.path} component={Scheduling} />
              <Route path={Navigation.Routes.team.path} component={ManageSheriffs} />
              <Route path={Navigation.Routes.dutyRoster.setup.path} component={DefaultAssignments} />
              <Route path={Navigation.Routes.schedule.distribute.path} component={PublishSchedule} />

              <AssignmentDutyEditModal />
              <SheriffProfileModal />
              <SheriffProfileCreateModal />
              <ScheduleShiftCopyModal />
              <ScheduleShiftAddModal />
              <ConnectedConfirmationModal />
              <AssignmentSheriffDutyReassignmentModal />
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
    isCourthouseSet: isCurrentCourthouseSet(state),
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
