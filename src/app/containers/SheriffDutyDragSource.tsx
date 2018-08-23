import React from 'react';
import dragSourceFactory from '../infrastructure/DragDrop/dragSourceFactory';
import { SheriffDuty } from '../api';

export interface DraggedSheriffDuty extends SheriffDuty {
}

export interface SheriffDutyDropResult extends SheriffDuty {
    dropEffect?: 'copy' | 'move';
}

interface SheriffSourceFactoryProps {
    beginDrag?: (sheriffDuty: SheriffDuty) => void;
    endDrag?: (args: any) => void;
}

const GenericSheriffDutyDragSource = dragSourceFactory<SheriffSourceFactoryProps, DraggedSheriffDuty, void>
    ('SheriffDuty');

interface SheriffDutyDragSourceProps {
    sheriffDuty: SheriffDuty;
    beginDrag?: (sheriffDuty: SheriffDuty) => void;
    endDrag?: (args: any) => void;
    canDrag?: (sheriffDuty: SheriffDuty) => boolean;
}

export default class SheriffDutyDragSource extends React.PureComponent<SheriffDutyDragSourceProps> {
    render() {
        const {
            children,
            sheriffDuty,
            beginDrag,
            endDrag,
            canDrag = (sd: SheriffDuty) => sd && sd.sheriffId != undefined
        } = this.props;
        return (
            <GenericSheriffDutyDragSource
                data={sheriffDuty}
                beginDrag={beginDrag}
                endDrag={endDrag}
                canDrag={() => canDrag(sheriffDuty)}
            >
                {children}
            </GenericSheriffDutyDragSource>
        );
    }
}