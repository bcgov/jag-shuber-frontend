import * as React from 'react';
import {
    SheriffAssignment,
    TRAINING_TYPES,
    WORK_SECTIONS
} from '../api/index';
import {
    Table,
    Glyphicon,
    Badge
} from 'react-bootstrap';
import DateDisplay from './DateDisplay';

export interface AssignmentDetailsProps {
    assignment: SheriffAssignment;
}

export default class AssignmentDetails extends React.Component<AssignmentDetailsProps, any>{
    render() {
        const {
            assignment: {
                startTime,
                endTime,
                workSectionId,
                title,
                assignmentCourt,
                pickupLocation,
                dropoffLocation,
                sherrifsRequired,
                gateNumber,
                notes
            }
        } = this.props;

        return (
            <div>
                <h2>{title}</h2>
                <strong>Start Time: </strong><DateDisplay date={startTime} showMonth showDay showYear showTime/>
                <br />
                <strong>End Time: </strong><DateDisplay date={endTime} showMonth showDay showYear showTime/>
                <br />
                <br />
                {WORK_SECTIONS[workSectionId] === WORK_SECTIONS.COURTS &&
                    <div>
                        <strong>Assignment Court: </strong>{assignmentCourt && <Glyphicon glyph="ok" className="text-success" /> || <Glyphicon glyph="remove" className="text-danger" />}
                    </div>}

                {WORK_SECTIONS[workSectionId] === WORK_SECTIONS.ESCORTS &&
                    <div>
                        <strong>Pickup Location: </strong>{pickupLocation}<br />
                        <strong>Dropoff Location: </strong>{dropoffLocation}
                    </div>}

                {WORK_SECTIONS[workSectionId] === WORK_SECTIONS.GATES &&
                    <div>
                        <strong>Gate Number: </strong>{gateNumber}
                    </div>}
                <br />
                <strong>Sheriffs Required: </strong> <Badge>{sherrifsRequired}</Badge>
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
                {notes}
            </div>
        );
    }
}