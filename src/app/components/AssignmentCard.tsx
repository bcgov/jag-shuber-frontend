import * as React from 'react'
import { 
    Panel,
    OverlayTrigger,
    Button,
    Glyphicon,
    Popover 
} from 'react-bootstrap'
import SheriffAbilityPile from './SheriffAbilityPile'
import { SheriffAssignment } from '../api/index';
import AssignmentDragSource  from '../containers/AssignmentDragSource';
import { default as AssignmentView } from './AssignmentView';

export interface AssignmentCardProps {
    onClick?: () => void;
    assignment: SheriffAssignment;
    currentGroupId: number;
}

export default class AssignmentCard extends React.PureComponent<AssignmentCardProps, any>{
    render() {
        const { currentGroupId, assignment: { assignmentType, requiredAbilities, id, notes }, assignment } = this.props;
        const showAssignmentDetails = (
            <Popover id="popover-trigger-focus">
               <AssignmentView assignment={assignment} />
            </Popover>
        );
        return (
            <AssignmentDragSource id={id} currentGroupId={currentGroupId} >
                <Panel bsStyle="primary">
                    <h3>{assignmentType}</h3>
                    <h4>{notes}</h4>
                    <SheriffAbilityPile abilities={requiredAbilities} />
                    <OverlayTrigger trigger="focus" placement="right" overlay={showAssignmentDetails}>
                        <Button><Glyphicon glyph="menu-right" /></Button>
                    </OverlayTrigger>
                </Panel>
            </AssignmentDragSource>
        )



    }
}

