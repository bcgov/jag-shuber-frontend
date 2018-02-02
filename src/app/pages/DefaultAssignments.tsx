import * as React from 'react';
import {
    Well
} from 'react-bootstrap';
import AddAssignmentModal from '../containers/AddAssignmentModal';
import AssignmentDefaultList from '../components/AssignmentDefaultList';

class DefaultAssignments extends React.PureComponent {
    render() {
        return (

            <div style={{ display: "flex", justifyContent: "center" }}>
                <Well style={{ display: "flex", backgroundColor: 'white', flexDirection: "column", flex: "1 1", maxWidth: "80%", minWidth: 800 }}>
                    <div style={{ flex: "1", alignSelf: "center", paddingBottom: 15 }}>
                        <h1>Manage Default Assignments</h1>
                    </div>
                    <AssignmentDefaultList />
                    <div style={{ textAlign: "right" }}>
                        <AddAssignmentModal />
                    </div>
                </Well>
            </div>
        );
    }
}

export default DefaultAssignments;


