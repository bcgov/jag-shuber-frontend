import * as React from 'react'
import ItemTypes from '../ItemTypes'
import { DragSource } from 'react-dnd';
import { Panel } from 'react-bootstrap'
import SheriffAbilityPile from '../../../components/SheriffAbilityPile'
import { SheriffAssignment } from '../../../api/index';

const assignmentSource: any = {
    beginDrag(props: any) {
        return props;
    },
    endDrag(props:AssignmentCardProps,monitor:any){
        const item = monitor.getItem();
        console.log(item);
    }
}

function collect(connect: any, monitor: any) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}


export interface AssignmentCardProps {
    onClick?: () => void;
    assignment: SheriffAssignment;
    connectDragSource?: any;
    isDragging?: boolean;
}



class AssignmentCard extends React.PureComponent<AssignmentCardProps, any>{
    render() {
        const { assignment, connectDragSource } = this.props;
        const { title, requiredAbilities, description } = assignment;


        return connectDragSource(
            <div>
                <Panel bsStyle="primary">
                    <h3>{title}</h3>
                    <h4>{description}</h4>
                    <SheriffAbilityPile abilities={requiredAbilities} />
                </Panel>
            </div>
        );


    }
}

export default DragSource<AssignmentCardProps>(ItemTypes.ASSIGNMENT, assignmentSource, collect)(AssignmentCard)
