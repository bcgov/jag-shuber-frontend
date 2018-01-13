import { ItemTypes, sourceFactory } from '../../../infrastructure/DragDrop';
// import * as actions from '../actions'
import { connect } from 'react-redux';

export interface DraggedSheriff {
    badgeNumer: number;
    onDuty: boolean;
}

export interface SheriffDropResult {
    dropEffect?: "copy" | "move";
    badgeNumber: number;
    onDuty: boolean;
}

interface AssignmentSourceFactoryProps {
    onDuty: boolean;
    badgeNumber: number;
    getDragData?: () => DraggedSheriff;
    endDrag?: (result?: SheriffDropResult) => void;
}

const AssignmentSourceFactory = sourceFactory<AssignmentSourceFactoryProps, DraggedSheriff, SheriffDropResult>(ItemTypes.SHERIFF);

const mapDispatchToProps = (dispatch: any, ownProps: AssignmentSourceFactoryProps) => {
    return {
        getDragData: (): DraggedSheriff => {
            return { badgeNumer: ownProps.badgeNumber, onDuty: ownProps.onDuty };
        },
        endDrag: (result?: SheriffDropResult) => {
            if (ownProps.endDrag) {
                ownProps.endDrag(result);
            }
            if (result) {
                //                const { dropEffect, sourceId, assignmentId, targetId } = result;

                // // If coming from unassigned or copying the task
                // if (sourceId == -1 || dropEffect == "copy") {
                //     dispatch(actions.linkAssignment(assignmentId, targetId));
                //     return;
                // }

                // // If moving to unassigned
                // if (targetId == -1) {
                //     dispatch(actions.unlinkAssignment(assignmentId, sourceId));
                //     return;
                // }

                // // Otherwise, swap the sourceId with the targetId
                // if (dropEffect == "move") {
                //     dispatch(actions.swapAssignment(assignmentId, sourceId, targetId));
                // }
            }
        }
    }
}


export default connect<AssignmentSourceFactoryProps>(null, mapDispatchToProps)(AssignmentSourceFactory);
