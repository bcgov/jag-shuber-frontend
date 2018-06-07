import * as React from 'react';
import {
    Well
} from 'react-bootstrap';
import AssignmentAddModal from '../containers/AssignmentAddModal';
import AssignmentList from '../containers/AssignmentList';
import Page from '../components/Page/Page';

class DefaultAssignments extends React.PureComponent {
    render() {
        return (
            <Page
                toolbar={
                    <Page.Toolbar
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
                        maxWidth: '80%',
                        minWidth: 800,
                        height: 'max-content',
                        margin: '0 auto'
                    }}
                >
                    <AssignmentList />
                </Well>
            </Page>
        );
    }
}

export default DefaultAssignments;
