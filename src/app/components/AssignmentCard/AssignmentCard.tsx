import React from 'react';
import AssignmentDutyAddModal from '../../containers/AssignmentDutyAddModal';
import './AssignmentCard.css';
import { BaseAssignment, IdType } from '../../api';

export interface AssignmentGroup extends BaseAssignment {
    assignmentId: IdType;
}

export interface AssignmentCardProps {
    assignmentGroup: AssignmentGroup;
}

export default class AssignmentCard extends React.PureComponent<AssignmentCardProps, {}> {
    render() {
        const { assignmentGroup: { title, assignmentId } } = this.props;
        return (
            <div className="assignment-card" >
                <div className="assignment-card-title" title={title}>
                    {title}
                </div>
                <div className="assignment-actions">
                    <AssignmentDutyAddModal assignmentId={assignmentId}/>
                </div>
            </div>            
        );
    }
}
