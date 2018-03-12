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
            <div style={{position: 'absolute', fontSize: 16}} >
                {title}
                <div style={{float: 'right', paddingLeft: 20}}>
                    {/* <div className="add-duty-btn"> */}
                    <AssignmentDutyAddModal assignmentId={id}/>
                    {/* </div> */}
                </div>
            </div>            
        );
    }
}
