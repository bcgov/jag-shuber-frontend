import * as React from 'react';
import {
  Route,
  BrowserRouter as Router
} from 'react-router-dom';
import {
  DragDropContext
} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Navigation from './components/Navigation';
import './assets/styles/Glyphicons.css';
import './index.css';
import DutyRoster from './pages/DutyRoster';
import ManageSheriffs from './pages/ManageSheriffs';
import DefaultAssignments from './pages/DefaultAssignments';
import Scheduling from './pages/Scheduling';
import AssignmentDutyEditModal from './containers/AssignmentDutyEditModal';
import CourthouseSelector from './containers/CourthouseSelector';
import api from './api/index';
import Client from './api/Client';
import { Well } from 'react-bootstrap';
import SheriffProfileModal from './containers/SheriffProfileModal';
import ScheduleShiftCopyModal from './containers/ScheduleShiftCopyModal';
import ScheduleShiftAddModal from './containers/ScheduleShiftAddModal';
import DeputySchedule from './pages/DeputySchedule/DeputySchedule';
import Footer from './components/Footer';

class Layout extends React.Component<{}, { initialize?: boolean }> {
  
  private onSelectCourthouse(id: string) {
    this.setState({ initialize: true });
  }

  render() {
    const needCourthouse = !(api as Client).isCourthouseSet;
    return (
      <Router>
        <div className="App">
          <div className="headerArea">
            <Navigation />
          </div>
          {needCourthouse &&
            <div style={{ display: 'flex', justifyContent: 'center', }}>
              <Well
                style={{
                  display: 'flex',
                  backgroundColor: 'white',
                  flexDirection: 'column',
                  flex: '1 1',
                  maxWidth: '80%',
                  minWidth: 800,
                  height: '70%'
                }}
              >
                <div style={{ paddingTop: 10 }}>
                  <h1>Select your Courthouse</h1>
                  <CourthouseSelector onChange={(id: string) => this.onSelectCourthouse(id)} />
                </div>
              </Well>
            </div>}

          {!needCourthouse &&
            <div className="mainArea">
              <Route exact={true} path="/" component={DutyRoster} />
              <Route path="/sheriffs/schedule" component={Scheduling} />
              <Route path="/sheriffs/manage" component={ManageSheriffs} />
              <Route path="/assignments/manage/default" component={DefaultAssignments} />
              <Route path="/schedule/deputyView" component={DeputySchedule} />          

              <AssignmentDutyEditModal />
              <SheriffProfileModal />
              <ScheduleShiftCopyModal />
              <ScheduleShiftAddModal />
            </div>}
          <div className="footerArea">
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

// Make our Layout the root of the Drag Drop Context
export default DragDropContext(HTML5Backend)(Layout);
