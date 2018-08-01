import React from 'react';
import dragSourceFactory from '../infrastructure/DragDrop/dragSourceFactory';
import ItemTypes from '../infrastructure/DragDrop/ItemTypes';
import { SheriffDuty } from '../api';

export interface DraggedSheriffDuty extends SheriffDuty {

}

export interface SheriffDutyDropResult extends SheriffDuty {
    dropEffect?: 'copy' | 'move';
}

interface SheriffSourceFactoryProps {
    getDragData: () => DraggedSheriffDuty;
    beginDrag?: (sheriffDuty: SheriffDuty) => void;
    endDrag?: (args: any) => void;
}

const GenericSheriffDutyDragSource = dragSourceFactory<SheriffSourceFactoryProps, DraggedSheriffDuty, void>
    (ItemTypes.SHERIFF_DUTY);

interface SheriffDutyDragSourceProps {
    sheriffDuty: SheriffDuty;
    beginDrag?: (sheriffDuty: SheriffDuty) => void;
    endDrag?: (args: any) => void;
}

export default class SheriffDragSource extends React.PureComponent<SheriffDutyDragSourceProps> {
    render() {
        const { children, sheriffDuty, beginDrag, endDrag } = this.props;
        return (
            <GenericSheriffDutyDragSource 
                getDragData={() => sheriffDuty} 
                beginDrag={beginDrag} 
                endDrag={endDrag}
            >
                {children}
            </GenericSheriffDutyDragSource>
        );
    }
}