import * as React from 'react';
import DutyRosterTimeline from '../containers/DutyRosterTimeline/DutyRosterTimeline';
import TimelineToolsPanel from '../components/TimelineToolsPanel/TimelineToolsPanel';
import SheriffList from '../containers/SheriffList';
import { Sheriff } from '../api';
import { ListGroup } from 'react-bootstrap';
import SheriffDragSource from '../containers/SheriffDragSource';
import DutyRosterSheriffCard from '../containers/DutyRosterSheriffCard';
import DutyRosterControls from '../containers/DutyRosterControls';
import Page from '../components/Page/Page';

class DutyRoster extends React.PureComponent {
    render() {
        return (
            <Page
                toolbarStyle={{ justifyContent: 'center' }}
                contentStyle={{ height: 'inherit' }}
                toolbar={(
                    <div style={{ flex: 1, display: 'flex', position: 'relative', justifyContent: 'center' }}>
                        <DutyRosterControls />
                    </div>
                )}
            >

                <div style={{ display: 'flex', flexDirection: 'row', height: 'inherit' }}>
                    <div style={{ flex: '1 0px', minWidth: 500 }}>
                        <DutyRosterTimeline />
                    </div>
                    <TimelineToolsPanel titleText="My Team" titleBackgroundBorderLeft="1px solid #003366">
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
            </Page>
        );
    }
}

export default DutyRoster;
