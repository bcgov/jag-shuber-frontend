import * as React from 'react'
import { Panel } from 'react-bootstrap'
import SheriffAbilityPile from '../../../components/SheriffAbilityPile'
import { SheriffAssignment } from '../../../api/index';

import { AssignmentDragSource } from '../../../containers/DragDrop';

export interface AssignmentCardProps {
    onClick?: () => void;
    assignment: SheriffAssignment;
    currentGroupId: number;
}

export default class AssignmentCard extends React.PureComponent<AssignmentCardProps, any>{
    render() {
        const { currentGroupId,assignment: { title, requiredAbilities, id, description } } = this.props;

        return (
            <AssignmentDragSource id={id} currentGroupId={currentGroupId} >
                <Panel bsStyle="primary">
                    <h3>{title}</h3>
                    <h4>{description}</h4>
                    <SheriffAbilityPile abilities={requiredAbilities} />
                </Panel>
            </AssignmentDragSource>
        )



    }
}

