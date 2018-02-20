// import * as actions from '../modules/assignments/actions'
import { connect } from 'react-redux';
import dragSourceFactory from '../infrastructure/DragDrop/dragSourceFactory';
import ItemTypes from '../infrastructure/DragDrop/ItemTypes';

export interface DraggedAssignment {
    id: number;
    sourceId: number;
}

export interface AssignmentDropResult {
    dropEffect?: "copy" | "move";
    assignmentId: number;
    sourceId: number;
    targetId: number;
}

interface AssignmentSourceFactoryProps {
    id: number;
    currentGroupId: number;
    getDragData?: () => DraggedAssignment;
    endDrag?: (result?: AssignmentDropResult) => void;
}

const AssignmentSourceFactory = dragSourceFactory<AssignmentSourceFactoryProps, DraggedAssignment, AssignmentDropResult>(ItemTypes.ASSIGNMENT);

const mapDispatchToProps = (dispatch: any, ownProps: AssignmentSourceFactoryProps) => {
    return {
        getDragData: (): DraggedAssignment => {
            return { id: ownProps.id, sourceId: ownProps.currentGroupId };
        },
        endDrag: (result?: AssignmentDropResult) => {
            if (ownProps.endDrag) {
                ownProps.endDrag(result);
            }
            if (result) {
                const { dropEffect, sourceId, assignmentId, targetId } = result;
                console.log('dropping',assignmentId);
                // This case doesn't make sense, copying a task into unassigned
                if(targetId === -1 && dropEffect === "copy"){
                    return;
                }

                // todo: FIXME
                // If coming from unassigned or copying the task
                if (sourceId === -1 || dropEffect == "copy") {
                    // dispatch(actions.linkAssignment(assignmentId, targetId));
                    return;
                }

                // If moving to unassigned
                if (targetId === -1) {
                    // dispatch(actions.unlinkAssignment(assignmentId, sourceId));
                    return;
                }

                // Otherwise, swap the sourceId with the targetId
                if (dropEffect === "move") {
                    // dispatch(actions.swapAssignment(assignmentId, sourceId, targetId));
                }
            }
        }
    }
}


export default connect<AssignmentSourceFactoryProps>(null, mapDispatchToProps)(AssignmentSourceFactory);
