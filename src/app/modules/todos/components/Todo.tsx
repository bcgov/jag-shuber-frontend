///<reference path="../../../../libs/react-bootstrap.d.ts"/>
import * as React from 'react'
import * as PropTypes from 'prop-types'
import ItemTypes from '../ItemTypes'
import { DragSource } from 'react-dnd';
import {
    Label
    // , Badge
} from 'react-bootstrap'


const todoSource: any = {
    beginDrag(props: any) {
        return props;
    }
}

function collect(connect: any, monitor: any) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}


export interface TodoProps {
    onClick: () => void
    completed: boolean
    text: string
    connectDragSource?: any
    isDragging?: boolean
    id?: number
}

class Todo extends React.PureComponent<TodoProps, any>{

    static propTypes = {
        onClick: PropTypes.func.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    }
    render() {
        const { onClick, completed, text, connectDragSource, isDragging } = this.props;
        return connectDragSource(
            <div>
                <h2>
                    <Label onClick={onClick}
                        style={{
                            opacity: isDragging ? 0.5 : 1,
                            textDecoration: completed ? 'line-through' : 'none'
                        }}>
                        {text}
                    </Label>
                    {/* <Badge bsStyle='danger'>{id}</Badge> */}
                </h2>
            </div>
        )

    }
}

export default DragSource<TodoProps>(ItemTypes.TODO, todoSource, collect)(Todo)