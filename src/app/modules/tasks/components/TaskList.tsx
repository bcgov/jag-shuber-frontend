import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {
    ListGroup,
    ListGroupItem
} from 'react-bootstrap'
import TaskCard from './TaskCard'
import { SheriffTask } from '../../../api/index';

export interface TaskListProps {
    tasks: SheriffTask[]
}

class TaskList extends  React.PureComponent<TaskListProps, any>{
    // static propTypes = {
    //     todos: PropTypes.arrayOf(
    //       PropTypes.shape({
    //         id: PropTypes.number.isRequired,
    //         completed: PropTypes.bool.isRequired,
    //         text: PropTypes.string.isRequired
    //       }).isRequired
    //     ).isRequired,
    //     onTodoClick: PropTypes.func.isRequired
    //   }

    // renderOverlay(color: string) {
    //     return (
    //         <div style={{
    //             position: 'absolute',
    //             top: 0,
    //             left: 0,
    //             height: '100%',
    //             width: '100%',
    //             zIndex: 1,
    //             opacity: 0.5,
    //             backgroundColor: color,
    //         }} />
    //     );
    // }

    render() {
        const { tasks } = this.props;
         return ( 
            <ListGroup>
                {tasks.map(t => (
                    <ListGroupItem key={t.id}>
                        <TaskCard task={t} />
                    </ListGroupItem>
                ))}
            </ListGroup>
        )
    }
}

export default TaskList