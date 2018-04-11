import * as React from 'react';
import * as moment from 'moment';
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
import ScheduleSummary from '../containers/ScheduleSummary';

class SchedulingPage extends React.PureComponent {
    render() {
        return (
            <div>
                <div className="scheduling-toolbar" style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <ScheduleShiftAddModal />
                    <ScheduleShiftCopyModal />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <TimelineToolsPanel titleText="My Team">
                        <ListGroup>
                            <SheriffList
                                SheriffRenderer={(s: Sheriff) => (
                                    <SheriffDragSource sheriff={s}>
                                        <SheriffListCard sheriff={s} >
                                            <ScheduleSummary
                                                sheriffId={s.id}
                                                start={moment().startOf('week')}
                                                end={moment().endOf('week')}
                                            />
                                        </SheriffListCard>
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
