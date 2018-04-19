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
            <div >
                <div
                    style={{
                        backgroundColor: '#003366',
                        marginLeft: 3,
                        marginRight: 3, 
                        marginBottom: 3,
                        borderRadius: 3,
                        display: 'flex',
                        flexDirection: 'row',
                        paddingLeft: 10,
                        justifyContent: 'center',
                        
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
                                            date={moment().toISOString()}
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
