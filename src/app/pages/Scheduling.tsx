import * as React from 'react';
import SchedulingTimeline from '../containers/LongTermSchedule/LongTermSchedule';
import TimelineToolsPanel from '../components/TimelineToolsPanel/TimelineToolsPanel';
import SheriffList from '../containers/SheriffList';
import { Sheriff } from '../api';
import SheriffListCard from '../components/SheriffListCard/SheriffListCard';
import { ListGroup } from 'react-bootstrap';
import SheriffDragSource from '../containers/SheriffDragSource';
import ScheduleSummary from '../containers/ScheduleSummary';
import ScheduleControls from '../containers/ScheduleControls';
import Page from '../components/Page/Page';

class SchedulingPage extends React.PureComponent {
    render() {
        return (
            <Page
                disableLocations={false}
                toolbarStyle={{ justifyContent: 'center' }}
                toolbar={(
                    <div style={{ flex: 1, display: 'flex', position: 'relative', justifyContent: 'center' }}>
                        <ScheduleControls />
                    </div>
                )}
                contentStyle={{ height: 'inherit' }}
            >
                <div style={{ display: 'flex', flexDirection: 'row', height: 'inherit' }}>
                    <TimelineToolsPanel titleText="My Team" titleBackgroundBorderRight="1px solid #003366">
                        <ListGroup>
                            <SheriffList
                                SheriffRenderer={(s: Sheriff) => (
                                    <SheriffDragSource sheriff={s}>
                                        <SheriffListCard sheriff={s} >
                                            <div style={{ paddingLeft: 25 }}><ScheduleSummary sheriffId={s.id} /></div>
                                        </SheriffListCard>
                                    </SheriffDragSource>
                                )}
                            />
                        </ListGroup>
                    </TimelineToolsPanel>
                    <div style={{ flex: '1 0 0px', minWidth: 500, height: 'inherit' }}>
                        <SchedulingTimeline />
                    </div>
                </div>

            </Page>
        );
    }
}

export default SchedulingPage;
