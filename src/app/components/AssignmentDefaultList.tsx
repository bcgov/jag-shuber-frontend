import * as React from 'react';
import {
    Table
} from 'react-bootstrap';
import AssignmentDefaultRecurrenceDetails from './AssignmentDefaultRecurrenceDetails';
import {
    DEFAULT_ASSIGNMENTS,
    WORK_SECTIONS
} from '../api';

export default class AssignmentDefaultList extends React.PureComponent<any> {
    render() {
        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th className="text-left">Assignment</th>
                        <th className="text-left">Work Section</th>
                        <th className="text-left">Default Days &amp; Times</th>
                        <th className="text-left"># of Sheriffs</th>
                    </tr>
                </thead>
                <tbody>
                    {DEFAULT_ASSIGNMENTS.map(function (assignment) {
                        return (
                            <tr>
                                <td><strong>{assignment.assignmentTemplate.title}</strong></td>
                                <td>{assignment.assignmentTemplate.workSectionId && WORK_SECTIONS[assignment.assignmentTemplate.workSectionId]}</td>
                                <td>
                                    {assignment.recurrenceInfo.map((recurrence) => <AssignmentDefaultRecurrenceDetails data={recurrence} />)}
                                </td>
                                <td>{assignment.assignmentTemplate.sherrifsRequired}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }
}
