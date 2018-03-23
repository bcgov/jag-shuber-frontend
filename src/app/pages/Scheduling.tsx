import * as React from 'react';
import SchedulingTimeline from '../containers/LongTermSchedule/LongTermSchedule';
import TimelineToolsPanel from '../components/TimelineToolsPanel';
import SheriffList from '../containers/SheriffList';
import { Sheriff } from '../api';
import SheriffListCard from '../components/SheriffListCard/SheriffListCard';
import { ListGroup } from 'react-bootstrap';
import SheriffDragSource from '../containers/SheriffDragSource';
import ScheduleShiftAddModal from '../containers/ScheduleShiftAddModal';

class SchedulingPage extends React.PureComponent {
    render() {
        return (
            <div>
                <div style={{ textAlign: 'right', backgroundColor: '#003366'}}>
                <ScheduleShiftAddModal />
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
