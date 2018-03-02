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
import AssignmentDeleteModal from '../containers/AssignmentDeleteModal';
import WorkSectionIndicator from './WorkSectionIndicator/WorkSectionIndicator';

export interface AssignmentDefaultListProps {
    assignments: Assignment[];
}

export default class AssignmentDefaultList extends React.Component<AssignmentDefaultListProps> {
    render() {
        const { assignments = [] } = this.props;
        return (
            <div>
                {assignments.length == 0 && (
                    <span className="text-danger">No default assignments recorded. </span>
                )}
                {assignments.length > 0 && (
                    <Table responsive striped >
                        <thead>
                            <tr>
                                <th style={{width:25}} ></th>
                                <th className="text-left">Work Section</th>
                                <th className="text-left">Assignment</th>
                                <th className="text-left">Default Duties <Badge># of Sheriffs</Badge></th>
                                <th></th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map((assignment) => {
                                return (
                                    
                                    <tr>
                                        <td> <WorkSectionIndicator workSectionId={assignment.workSectionId}/> </td>
                                        <td>
                                           
                                            {/* <WorkSectionIndicator workSectionId={assignment.workSectionId}/> */}
                                            {WORK_SECTIONS[assignment.workSectionId]}
                                        
                                            
                                        </td>
                                        <td><strong>{assignment.title}</strong></td>
                                        <td>
                                            {assignment.recurrenceInfo &&
                                                assignment.recurrenceInfo.map((recurrence) => <AssignmentDefaultRecurrenceDetails data={recurrence} />)}
                                        </td>
                                        <td className="text-right"><AssignmentEditModal assignmentId={assignment.id} /></td>
                                        <td className="text-left"><AssignmentDeleteModal assignmentId={assignment.id} /></td>
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
