import React from 'react';
import dragSourceFactory from '../infrastructure/DragDrop/dragSourceFactory';
import { Sheriff } from '../api';

export interface DraggedSheriff extends Sheriff {

}

export interface SheriffDropResult extends Sheriff {
    dropEffect?: 'copy' | 'move';
}

interface SheriffSourceFactoryProps {
    getDragData: () => DraggedSheriff;
    beginDrag?: (sheriff: Sheriff) => void;
    endDrag?: (args: any) => void;
}

const GenericSheriffDragSource = dragSourceFactory<SheriffSourceFactoryProps, DraggedSheriff, void>
    ('Sheriff');

interface SheriffDragSourceProps {
    sheriff: Sheriff;
    beginDrag?: (sheriff: Sheriff) => void;
    endDrag?: (args: any) => void;
}

export default class SheriffDragSource extends React.PureComponent<SheriffDragSourceProps> {
    render() {
        const { children, sheriff, beginDrag, endDrag } = this.props;
        return (
            <GenericSheriffDragSource 
                getDragData={() => sheriff} 
                beginDrag={beginDrag} 
                endDrag={endDrag}
            >
                {children}
            </GenericSheriffDragSource>
        );
    }
}