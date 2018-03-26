import * as React from 'react';
import SchedulingTimeline from '../containers/LongTermSchedule/LongTermSchedule';
import TimelineToolsPanel from '../components/TimelineToolsPanel';
import SheriffList from '../containers/SheriffList';
import { Sheriff } from '../api';
import SheriffListCard from '../components/SheriffListCard/SheriffListCard';
import { ListGroup } from 'react-bootstrap';
import SheriffDragSource from '../containers/SheriffDragSource';
import ScheduleShiftAddModal from '../containers/ScheduleShiftAddModal';
import ScheduleShiftCopyModal from '../containers/ScheduleShiftCopyModal';
import './pages.css';
// import { Glyphicon, 
//     Button, 
//     // DropdownButton, 
//     // Dropdown, 
//     // MenuItem 
// } from 'react-bootstrap';

class SchedulingPage extends React.PureComponent {
    render() {
        return (
            <div>
                <div className="scheduling-toolbar">
                {/* <Dropdown id="dropdown-custom-1">
                        <Dropdown.Toggle noCaret bsStyle="link" bsSize="large" style={{color: 'white'}}>
                        <Glyphicon glyph="wrench" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        <MenuItem eventKey="1"><ScheduleShiftAddModal /></MenuItem>
                        <MenuItem eventKey="2"><Glyphicon style={{color: 'blue'}} glyph="repeat"/></MenuItem>
                        </Dropdown.Menu>
                    </Dropdown>

                    <DropdownButton title="test" id="testing" noCaret>
                        <MenuItem> <ScheduleShiftAddModal /></MenuItem>
                        <MenuItem> <Glyphicon style={{color: 'blue'}} glyph="repeat"/></MenuItem>
                        </DropdownButton> */}


                    <ScheduleShiftAddModal />
                    <ScheduleShiftCopyModal />
                </div>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                
                <TimelineToolsPanel titleText="My Team">
                    <ListGroup>
                        <SheriffList
                            SheriffRenderer={(s: Sheriff) => (
                                <SheriffDragSource sheriff={s}>
                                    <SheriffListCard sheriff={s} showScheduleSummary={true} />
                                </SheriffDragSource>
                            )}
                        />
                    </ListGroup>
                </TimelineToolsPanel>
                <div style={{ flex: '1 0px', minWidth: 500 }}>
                    <SchedulingTimeline />
                </div>
            </div>
            
            </div>
        );
    }
}

export default SchedulingPage;
