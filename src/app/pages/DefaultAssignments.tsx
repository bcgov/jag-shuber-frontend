import * as React from 'react';
import {
    Well
} from 'react-bootstrap';
import AssignmentAddModal from '../containers/AssignmentAddModal';
import AssignmentList from '../containers/AssignmentList';
import Page, { PageToolbar } from '../components/Page/Page';

class DefaultAssignments extends React.PureComponent {
    render() {
        return (
            <Page
                disableLocations={false}
                toolbar={
                    <PageToolbar
                        right={(
                            <div style={{ marginTop: 3 }}>
                                <AssignmentAddModal isDefaultTemplate={true} />
                            </div>
                        )}
                    />
                }
            >
                <Well
                    style={{
                        display: 'flex',
                        backgroundColor: 'white',
                        flexDirection: 'column',
                        flex: '1 1',
                        maxWidth: '85%',
                        height: 'max-content',
                        margin: '0 auto',
                        borderRadius: 0
                    }}
                >
                    <AssignmentList />
                </Well>
            </Page>
        );
    }
}

export default DefaultAssignments;
