import * as React from 'react';
import {
    Table
} from 'react-bootstrap';
import AssignmentDefaultRecurrenceDetails from './AssignmentDefaultRecurrenceDetails';
import {
    WORK_SECTIONS,
    SheriffAssignmentTemplate
} from '../api';
import AssignmentEditModal from '../containers/AssignmentEditModal';

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
                    <Table responsive striped>
                        <thead>
                            <tr>
                                <th className="text-left">Assignment</th>
                                <th className="text-left">Work Section</th>
                                <th className="text-left">Default Days &amp; Times</th>
                                <th className="text-left"># of Sheriffs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {templates.map((template) => {
                                return (
                                    <tr>
                                        <td><strong>{template.assignment.title}</strong></td>
                                        <td>{template.assignment.workSectionId && WORK_SECTIONS[template.assignment.workSectionId]}</td>
                                        <td>
                                            {template.recurrenceInfo.map((recurrence) => <AssignmentDefaultRecurrenceDetails data={recurrence} />)}
                                        </td>
                                        <td>{template.assignment.sherrifsRequired}</td>
                                        <td><AssignmentEditModal templateId={template.id}/></td>
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
