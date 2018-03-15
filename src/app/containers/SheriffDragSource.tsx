import * as React from 'react';
import dragSourceFactory from '../infrastructure/DragDrop/dragSourceFactory';
import ItemTypes from '../infrastructure/DragDrop/ItemTypes';
import { Sheriff } from '../api';

export interface DraggedSheriff extends Sheriff {

}

export interface SheriffDropResult extends Sheriff {
    dropEffect?: 'copy' | 'move';
}

interface AssignmentSourceFactoryProps {
    getDragData: () => DraggedSheriff;
}

const GenericSheriffDragSource = dragSourceFactory<AssignmentSourceFactoryProps, DraggedSheriff, void>
    (ItemTypes.SHERIFF);

interface SheriffDragSourceProps {
    sheriff: Sheriff;
}

export default class SheriffDragSource extends React.PureComponent<SheriffDragSourceProps> {
    render() {
        const { children, sheriff } = this.props;
        return (
            <GenericSheriffDragSource getDragData={() => sheriff}>
                {children}
            </GenericSheriffDragSource>
        );
    }
}