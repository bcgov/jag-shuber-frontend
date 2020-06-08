import * as React from 'react';
import { ListGroup } from 'react-bootstrap';

import { Sheriff } from '../api';

import Page from '../components/Page/Page';
import TimelineToolsPanel from '../components/TimelineToolsPanel/TimelineToolsPanel';

import SchedulingTimeline from '../containers/LongTermSchedule/LongTermSchedule';
import SheriffDragSource from '../containers/SheriffDragSource';
import SheriffList from '../containers/SheriffList';
import SchedulingSheriffCard from '../containers/SchedulingSheriffCard';
import ScheduleControls from '../containers/ScheduleControls';

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
                                        <SchedulingSheriffCard sheriff={s} />
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
