import React from 'react';
import {
    default as dropTargetFactory,
} from '../infrastructure/DragDrop/dropTargetFactory';
import { Sheriff } from '../api';

type DroppableItem = Sheriff;

const GenericDropTarget = dropTargetFactory<DroppableItem, void>('Sheriff');

interface SheriffDropTargetProps {
    canDropItem?: (item: DroppableItem) => boolean;
    onDropItem: (item: DroppableItem) => void;
    style?: any; // React.CSSProperties;
    computeStyle?: (status: { isActive: boolean, isOver: boolean, canDrop: boolean }) => React.CSSProperties;
    className?: string;
    onClick?: () => void;
}

export default class SheriffDropTarget extends React.PureComponent<SheriffDropTargetProps> {
    render() {
        const {
            canDropItem,
            onDropItem,
            style,
            className,
            onClick,
            computeStyle
        } = this.props;

        return (
            <GenericDropTarget
                canDropItem={(a) => canDropItem ? canDropItem(a as DroppableItem) : false}
                onDropItem={(a) => onDropItem && onDropItem(a)}
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
