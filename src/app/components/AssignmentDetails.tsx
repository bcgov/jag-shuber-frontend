import * as React from 'react';
import {
    SheriffAssignment,
    TRAINING_TYPES,
    ASSIGNMENT_TYPES
} from '../api/index';
import {
    Table,
    Glyphicon,
    Badge
} from 'react-bootstrap';

export interface AssignmentDetailsProps {
    assignment: SheriffAssignment;
}

export default class AssignmentDetails extends React.Component<AssignmentDetailsProps, any>{
    render() {
        const { assignment } = this.props;
        return (
            <div>
                <h2>{assignment.assignmentType}</h2>
                <strong>Start Time: </strong>{assignment.startTime.toString().substring(0, 24)}
                <br />
                <strong>End Time: </strong>{assignment.endTime.toString().substring(0, 24)}
                <br />
                <br />
                {assignment.assignmentType === ASSIGNMENT_TYPES.courtSecurity &&
                    <div>
                        <strong>Court Room: </strong>{assignment.courtRoom}<br />
                        <strong>Assignment Court: </strong>{assignment.assignmentCourt && <Glyphicon glyph="ok" className="text-success" /> || <Glyphicon glyph="remove" className="text-danger" />}
                    </div>}

                {assignment.assignmentType === ASSIGNMENT_TYPES.escortServices &&
                    <div>
                        <strong>Pickup Location: </strong>{assignment.pickupLocation}<br />
                        <strong>Dropoff Location: </strong>{assignment.dropoffLocation}
                    </div>}

                {assignment.assignmentType === ASSIGNMENT_TYPES.gateSecurity &&
                    <div>
                        <strong>Gate Number: </strong>{assignment.gateNumber}
                    </div>}
                <br />
                <strong>Sheriffs Required: </strong> <Badge>{assignment.sherrifsRequired}</Badge>
                <br />
                <br />

                <h3>Required Qualifications</h3>
                <Table responsive>
                    <thead>
                        <tr >
                            <th className="text-left">Qualification</th>
                            <th className="text-left">Required</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(TRAINING_TYPES).map((k, i) =>
                            <tr key={k}>
                                <td>
                                    {TRAINING_TYPES[k]}
                                </td>
                                <td>
                                    <Glyphicon glyph="ok" className="text-success" />
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                    <h3>Notes</h3>
                    {assignment.notes}
            </div>
            );
    }
}