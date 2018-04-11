import * as React from 'react';
import * as moment from 'moment';
import DailyTimeline from '../containers/DailyTimeline/DailyTimeline';
import TimelineToolsPanel from '../components/TimelineToolsPanel';
import SheriffList from '../containers/SheriffList';
import { Sheriff } from '../api';
// import SheriffListCard from '../components/SheriffListCard/SheriffListCard';
import { ListGroup } from 'react-bootstrap';
import SheriffDragSource from '../containers/SheriffDragSource';
import DutyRosterSheriffCard from '../containers/DutyRosterSheriffCard';

class TimelinePage extends React.PureComponent {
    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: '1 0px', minWidth: 500 }}>
                    <DailyTimeline />
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

export default TimelinePage;
