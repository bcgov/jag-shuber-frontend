import * as React from 'react'
import { AssignmentDropTarget } from '../../../containers/DragDrop';


export interface DroppableAssignmentRowProps {
    targetId:number;
    top?: number;
    height?: number;
    width?: number;
}

class DroppableAssignmentRow extends React.PureComponent<DroppableAssignmentRowProps, {}>{
    render() {
        const {            
            top,
            height,
            width,
            targetId
        } = this.props;

        return (
            <AssignmentDropTarget
                targetId={targetId}
                style={{
                    position: 'absolute',
                    top: top,
                    height: height,
                    left: 0,                    
                    width: width,
                    opacity: .4,
                    borderWidth:0,
                    zIndex: 70  // See https://github.com/namespace-ee/react-calendar-timeline#what-are-the-zindex-values-for-all-the-elements,                    
                }}
                computeStyle={({isActive,isOver,canDrop})=>{
                    let backgroundColor = 'transparent'
                    if (isActive) {
                        backgroundColor = 'green'
                    } else if (canDrop) {
                        backgroundColor = 'lightGreen'
                    } else if (isOver && !canDrop) {
                        backgroundColor = '#FF000088'
                    }
                    return {
                        backgroundColor
                    };
                }}
            >
            </AssignmentDropTarget>
        )
    }
}

export default DroppableAssignmentRow