import * as React from 'react';
import {
    Table
} from 'react-bootstrap';
import AssignmentDefaultRecurrenceDetails from './AssignmentDefaultRecurrenceDetails';
import {
    WORK_SECTIONS,
    SheriffAssignmentTemplate
} from '../api';

export interface AssignmentDefaultListProps {
    templates: SheriffAssignmentTemplate[];
}

export default class AssignmentDefaultList extends React.PureComponent<AssignmentDefaultListProps> {
    render() {
        const { templates = [] } = this.props;
        return (
            <div>
                {templates.length == 0 && (
                    <span className="text-danger">No default assignments recorded. </span>
                )}
                {templates.length > 0 && (
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
                            {templates.map((assignment) => {
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
                )}
            </div>
        );
    }
}
