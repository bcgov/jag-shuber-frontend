import * as React from 'react';
import * as moment from 'moment';
import DutyRosterTimeline from '../containers/DutyRosterTimeline/DutyRosterTimeline';
import TimelineToolsPanel from '../components/TimelineToolsPanel';
import SheriffList from '../containers/SheriffList';
import { Sheriff } from '../api';
import { ListGroup } from 'react-bootstrap';
import SheriffDragSource from '../containers/SheriffDragSource';
import DutyRosterSheriffCard from '../containers/DutyRosterSheriffCard';
import DutyRosterControls from '../containers/DutyRosterControls';

class DutyRoster extends React.PureComponent {
    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <DutyRosterControls />
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
                                            date={moment().toISOString()}
                                        />
                                    </SheriffDragSource>
                                )} 
                        />
                    </ListGroup>
                </TimelineToolsPanel>
            </div>
        );
    }
}

export default DutyRoster;
