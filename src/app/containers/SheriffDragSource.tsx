// import { connect } from 'react-redux';
// import { updateSheriff } from '../modules/sheriffs/actions';
import * as React from 'react';
import dragSourceFactory from '../infrastructure/DragDrop/dragSourceFactory';
import ItemTypes from '../infrastructure/DragDrop/ItemTypes';
import { Sheriff } from '../api';

export interface DraggedSheriff extends Sheriff {

}

export interface SheriffDropResult extends Sheriff {
    dropEffect?: "copy" | "move";
}

interface AssignmentSourceFactoryProps {
    getDragData: () => DraggedSheriff;
}

const GenericSheriffDragSource = dragSourceFactory<AssignmentSourceFactoryProps, DraggedSheriff, void>(ItemTypes.SHERIFF);


interface SheriffDragSourceProps {
    sheriff: Sheriff;
}

export default class SheriffDragSource extends React.PureComponent<SheriffDragSourceProps>{
    render() {
        const {children,sheriff} = this.props;
        return (
            <GenericSheriffDragSource getDragData={()=>sheriff}>
                {children}
            </GenericSheriffDragSource>
        )
    }
}

// const mapDispatchToProps = (dispatch: any, ownProps: AssignmentSourceFactoryProps) => {
//     return {
//         getDragData: (): DraggedSheriff => {
//             return { ...ownProps.sheriff };
//         },
//         endDrag: (result?: SheriffDropResult) => {
//             if (ownProps.endDrag) {
//                 ownProps.endDrag(result);
//             }
//             if (result) {
//                 const { dropEffect, ...rest } = result;
//                 dispatch(updateSheriff(rest));
//             }
//         }
//     }
// }

