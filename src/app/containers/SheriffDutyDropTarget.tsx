import React from 'react';
import {
    default as dropTargetFactory,
} from '../infrastructure/DragDrop/dropTargetFactory';
import { SheriffDuty, Sheriff } from '../api';

type DroppableItem = SheriffDuty | Sheriff;

const GenericDropTarget = dropTargetFactory<DroppableItem, void>(['SheriffDuty', 'Sheriff']);

interface SheriffDutyDropTargetProps {
    canDropSheriff?: (item: Sheriff) => boolean;
    onDropSheriff?: (item: Sheriff) => void;
    canDropSheriffDuty?: (item: SheriffDuty) => boolean;
    onDropSheriffDuty?: (item: SheriffDuty) => void;
    style?: React.CSSProperties;
    computeStyle?: (status: { isActive: boolean, isOver: boolean, canDrop: boolean }) => React.CSSProperties;
    className?: string;
    onClick?: () => void;
}

export default class SheriffDutyDropTarget extends React.PureComponent<SheriffDutyDropTargetProps> {

    render() {
        const {
            canDropSheriff,
            onDropSheriff,
            canDropSheriffDuty,
            onDropSheriffDuty,
            style,
            className,
            onClick,
            computeStyle
        } = this.props;

        return (
            <GenericDropTarget
                itemHandlers={[
                    {
                        type: 'Sheriff',
                        canDropItem: (item) => canDropSheriff ? canDropSheriff(item) : false,
                        onDropItem: (item) => onDropSheriff && onDropSheriff(item)
                    },
                    {
                        type: 'SheriffDuty',
                        canDropItem: (item) => canDropSheriffDuty ? canDropSheriffDuty(item) : false,
                        onDropItem: (item) => onDropSheriffDuty && onDropSheriffDuty(item)
                    }
                ]}
                style={style}
                className={className}
                onClick={onClick}
                computeStyle={computeStyle}
            >
                {this.props.children}
            </GenericDropTarget>
        );
    }
}