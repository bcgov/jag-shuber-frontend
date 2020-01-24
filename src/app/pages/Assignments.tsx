import * as React from 'react';
import AssignmentTimeline from '../containers/FutureAssignment/FutureAssignment';
import Page from '../components/Page/Page';
import AssignmentControls from '../containers/AssignmentScheduleControls';

class AssignmentPage extends React.PureComponent {
    render() {
        return (
            <Page
                disableLocations={false}
                toolbarStyle={{ justifyContent: 'center' }}
                toolbar={(
                    <div style={{ flex: 1, display: 'flex', position: 'relative', justifyContent: 'center' }}>
                        <AssignmentControls />
                    </div>
                )}
                contentStyle={{ height: 'inherit' }}
            >
                <div style={{ display: 'flex', flexDirection: 'row', height: 'inherit' }}>
                    <div style={{ flex: '1 0 0px', minWidth: 500, height: 'inherit' }}>
                        <AssignmentTimeline />
                    </div>
                </div>

            </Page>
        );
    }
}

export default AssignmentPage;
