import * as React from 'react';
import {
    Table,
    Badge
} from 'react-bootstrap';
import AssignmentDefaultRecurrenceDetails from './AssignmentDefaultRecurrenceDetails';
import {
    WORK_SECTIONS,
    Assignment
} from '../api';
import AssignmentEditModal from '../containers/AssignmentEditModal';
import WorkSectionIndicator from './WorkSectionIndicator/WorkSectionIndicator';

export interface AssignmentDefaultListProps {
    assignments: Assignment[];
}

export default class AssignmentDefaultList extends React.Component<AssignmentDefaultListProps> {
    render() {
        const { assignments = [] } = this.props;
        return (
            <div>
                {assignments.length === 0 && (
                    <span className="text-danger">No default assignments recorded. </span>
                )}
                {assignments.length > 0 && (
                    <Table responsive={true} striped={true} >
                        <thead>
                            <tr>
                                <th style={{width: 35}} />
                                <th className="text-left">Work Section</th>
                                <th className="text-left">Assignment</th>
                                <th className="text-left">Default Duties <Badge># of Sheriffs</Badge></th>
                                <th/>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map((assignment, index) => {
                                return (
                                    <tr key={index}>
                                        <td style={{position:'relative'}}>
                                            <WorkSectionIndicator 
                                                workSectionId={assignment.workSectionId} 
                                                includeCode={false}                                                
                                            />
                                        </td>
                                        <td>{WORK_SECTIONS[assignment.workSectionId]}</td>
                                        <td><strong>{assignment.title}</strong></td>
                                        <td>
                                            {assignment.dutyRecurrences &&
                                                assignment.dutyRecurrences.map((recurrence) => 
                                                <AssignmentDefaultRecurrenceDetails key="recurrence" data={recurrence}/>
                                            )}
                                        </td>
                                        <td className="text-right">
                                            <AssignmentEditModal assignmentId={assignment.id} />
                                        </td>
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
