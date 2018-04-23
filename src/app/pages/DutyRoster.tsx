import * as React from 'react';
import DutyRosterTimeline from '../containers/DutyRosterTimeline/DutyRosterTimeline';
import TimelineToolsPanel from '../components/TimelineToolsPanel';
import SheriffList from '../containers/SheriffList';
import { Sheriff } from '../api';
import { ListGroup } from 'react-bootstrap';
import SheriffDragSource from '../containers/SheriffDragSource';
import DutyRosterSheriffCard from '../containers/DutyRosterSheriffCard';
import DutyRosterControls from '../containers/DutyRosterControls';
import './pages.css';

class DutyRoster extends React.PureComponent {
    render() {
        return (
            <div >
                <div
                    className="toolbar"
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        maxHeight: 85,
                        paddingTop: 5
                    }}
                >
                    <DutyRosterControls />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: '1 0px', minWidth: 500 }}>
                    <DutyRosterTimeline />
                </div>
                <TimelineToolsPanel titleText="My Team">
                    <ListGroup>
                        <SheriffList 
                            SheriffRenderer={(s: Sheriff) => 
                                (<SheriffDragSource sheriff={s}>
                                        <DutyRosterSheriffCard  
                                            sheriff={s} 
                                        />
                                    </SheriffDragSource>
                                )} 
                        />
                    </ListGroup>
                </TimelineToolsPanel>
                </div>
            </div>
        );
    }
}

export default DutyRoster;
