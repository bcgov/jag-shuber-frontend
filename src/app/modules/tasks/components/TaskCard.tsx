import * as React from 'react'
// import * as PropTypes from 'prop-types'
import ItemTypes from '../ItemTypes'
import { DragSource } from 'react-dnd';
import {
    //Label,
    Panel
} from 'react-bootstrap'
import SheriffAbilityPile from '../../../components/SheriffAbilityPile'
import { SheriffTask } from '../../../api/index';

const taskSource: any = {
    beginDrag(props: any) {
        return props;
    },
    endDrag(props:TaskCardProps,monitor:any){
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


export interface TaskCardProps {
    onClick?: () => void;
    task: SheriffTask;
    connectDragSource?: any;
    isDragging?: boolean;
}



class TaskCard extends React.PureComponent<TaskCardProps, any>{

    // static propTypes = {
    //     //onClick: PropTypes.func.isRequired,
    //     completed: PropTypes.bool.isRequired,
    //     text: PropTypes.string.isRequired
    // }

    render() {
        const { task, connectDragSource } = this.props;
        const { title, requiredAbilities } = task;


        return connectDragSource(
            <div>
                <Panel bsStyle="primary">
                    <h4>{title}</h4><br />
                    <SheriffAbilityPile abilities={requiredAbilities} />
                </Panel>
            </div>
        );


    }
}

export default DragSource<TaskCardProps>(ItemTypes.TASK, taskSource, collect)(TaskCard)
