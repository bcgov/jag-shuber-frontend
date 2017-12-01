import * as React from 'react'
import {default as TaskList,TaskListProps} from './TaskList'
import ItemTypes from '../ItemTypes';
import { DropTarget } from 'react-dnd';
import { SheriffTask } from '../../../api/index';

const listTarget = {
    canDrop(props: any,monitor:any) {
        const {canDropTask=(t:SheriffTask)=>true} = props; 
        return canDropTask(monitor.getItem());
    },
    drop(props: any,monitor:any) {
        const {onDropTask} = props;
        if(onDropTask){
            let {task} = monitor.getItem();
            onDropTask(task);
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

export interface DropTaskListProps extends TaskListProps {
    onDropTask?:(task:SheriffTask)=>void;
    canDropTask?:(task:SheriffTask)=>void;
    connectDropTarget?: any;    
    isOver?: boolean;
    canDrop?: boolean;
}

@DropTarget<DropTaskListProps>(ItemTypes.TASK, listTarget, collect)
class DropTaskList extends React.PureComponent<DropTaskListProps,{}>{

    render(){
        const {connectDropTarget,isOver,canDrop,...restProps} = this.props;

        let borderColor = isOver ? (!canDrop ? 'red' : 'green') : 'black'
        
        return connectDropTarget(
            <div style={{
                position: 'relative',
                minHeight:100,             
                border: 'dashed 2px',
                borderColor:borderColor
            }}>
                <TaskList {...restProps}/>
                {/* {isOver && !canDrop && this.renderOverlay('red')}
                {!isOver && canDrop && this.renderOverlay('yellow')}
                {isOver && canDrop && this.renderOverlay('green')} */}
            </div>
        )
    }
}

export default DropTaskList