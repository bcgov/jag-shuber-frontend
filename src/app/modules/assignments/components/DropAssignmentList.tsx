import * as React from 'react'
import {default as AssignmentList, AssignmentListProps} from './AssignmentList'
import ItemTypes from '../ItemTypes';
import { DropTarget } from 'react-dnd';
import { SheriffAssignment } from '../../../api/index';

const listTarget = {
    canDrop(props: any,monitor:any) {
        const {canDropAssignment=(t:SheriffAssignment)=>true} = props; 
        return canDropAssignment(monitor.getItem());
    },
    drop(props: any,monitor:any) {
        const {onDropAssignment} = props;
        if(onDropAssignment){
            let {assignment} = monitor.getItem();
            onDropAssignment(assignment);
        }        
    }
};

function collect(connect: any, monitor: any) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}

export interface DropAssignmentListProps extends AssignmentListProps {
    onDropAssignment?:(assignment:SheriffAssignment)=>void;
    canDropAssignment?:(assignment:SheriffAssignment)=>boolean;
    connectDropTarget?: any;    
    isOver?: boolean;
    canDrop?: boolean;
}

@DropTarget<DropAssignmentListProps>(ItemTypes.ASSIGNMENT, listTarget, collect)
class DropAssignmentList extends React.PureComponent<DropAssignmentListProps,{}>{

    render(){
        const {connectDropTarget,isOver,canDrop,...restProps} = this.props;

        const isActive = isOver && canDrop;
        let borderColor:string = 'transparent'
        if(isActive){
            borderColor = 'green'
        }else if(canDrop){
            borderColor = 'black'
        }else if(isOver && !canDrop){
            borderColor = 'red'
            
        }
        
        return connectDropTarget(
            <div style={{
                position: 'relative',
                minHeight:100,             
                border: 'dashed',                
                borderWidth:2,
                borderColor:borderColor
            }}>
                <AssignmentList {...restProps}/>
                {/* {isOver && !canDrop && this.renderOverlay('red')}
                {!isOver && canDrop && this.renderOverlay('yellow')}
                {isOver && canDrop && this.renderOverlay('green')} */}
            </div>
        )
    }
}

export default DropAssignmentList