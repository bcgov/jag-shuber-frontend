import * as React from 'react';
import {
  Route,
  BrowserRouter as Router
} from 'react-router-dom';
import {
  DragDropContext
} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// import Footer from './components/Footer';
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
import { Glyphicon } from 'react-bootstrap';
import { Collapse } from 'react-bootstrap';
import Legend from './components/Legend/Legend';

class Layout extends React.Component<{}, { isLegendOpen: boolean, initialize?: boolean }> {
  static defaultState = {
    isLegendOpen: true
  };

  constructor(props: any, context: any) {
    super(props, context);
    this.state = { isLegendOpen: true };
  }

  private onSelectCourthouse(id: string) {
    this.setState({ initialize: true });
  }

  render() {
    const needCourthouse = !(api as Client).isCourthouseSet;
    const { isLegendOpen } = this.state;
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
              <AssignmentDutyEditModal />
              <SheriffProfileModal />
              <ScheduleShiftCopyModal />
              <ScheduleShiftAddModal />
            </div>}
          <div className="footerArea">
            <div 
              className="footerArrowBackground" 
              onClick={() => this.setState({ isLegendOpen: !this.state.isLegendOpen })}
            >
              <Glyphicon className="footerArrow" glyph={isLegendOpen ? 'arrow-down' : 'arrow-up'} />
            </div>
              <div id="footer" style={{height: isLegendOpen ? 58 : 12}}>
                <Collapse in={isLegendOpen}>
                  <div>
                    <Legend />
                  </div>
                </Collapse>
              </div>
          </div>
        </div>
      </Router>
    );
  }
}

// Make our Layout the root of the Drag Drop Context
export default DragDropContext(HTML5Backend)(Layout);
