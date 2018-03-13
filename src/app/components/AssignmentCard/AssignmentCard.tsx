import * as React from 'react';
import { Assignment } from '../../api';
import AssignmentDutyAddModal from '../../containers/AssignmentDutyAddModal';
import './AssignmentCard.css';

export interface AssignmentCardProps {
    assignment: Assignment;
}

export default class AssignmentCard extends React.PureComponent<AssignmentCardProps, {}> {
    render() {
        const { assignment: { title, id } } = this.props;
        return (
            <div className="assignment-card" >
                {title}
                <div className="assignment-actions">
                    <AssignmentDutyAddModal assignmentId={id}/>
                </div>
            </div>            
        );
    }
}
