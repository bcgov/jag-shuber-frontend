import * as React from 'react'
import { CSSProperties } from 'react';
import { 
    default as dropTargetFactory, 
    DragDropStatus 
} from '../infrastructure/DragDrop/dropTargetFactory';
import ItemTypes from '../infrastructure/DragDrop/ItemTypes';
import { AssignmentDuty, Sheriff } from '../api';

type DroppableItem = Sheriff;

const GenericAssignmentDropTarget = dropTargetFactory<DroppableItem, void>(ItemTypes.SHERIFF);

interface AssignmentDutyDropTargetProps {
    duty: AssignmentDuty;
    canDropItem?: (item: DroppableItem) => boolean;
    onDropItem: (item: DroppableItem) => void;
    style?: CSSProperties;
    computeStyle?: (status: { isActive: boolean, isOver: boolean, canDrop: boolean }) => CSSProperties;
}

export default class AssignmentDutyDropTarget extends React.PureComponent<AssignmentDutyDropTargetProps> {

    static defaultProps: Partial<AssignmentDutyDropTargetProps> = {
        canDropItem: (i: DroppableItem) => true
    }

    // canDropItem(sheriff: DraggedSheriff) {
    //     const { sheriffIds = [] } = this.props.duty;
    //     return sheriff && !Number.isNaN(sheriff.badgeNumber)
    //         && sheriffIds.indexOf(sheriff.badgeNumber) == -1;
    // }

    computeStyle({ isActive, isOver, canDrop }: DragDropStatus): CSSProperties {
        let backgroundColor = '#96c0e6'
        let zIndex = 70;
        if (isActive) {
            zIndex = 90;
            backgroundColor = 'green'
        } else if (canDrop) {
            backgroundColor = 'lightGreen'
            zIndex = 90;
        } else if (isOver && !canDrop) {
            backgroundColor = '#FF000088'
            zIndex = 90;
        }
        return {
            backgroundColor,
            zIndex
        };
    }

    render() {
        const {
            computeStyle = (s: DragDropStatus) => this.computeStyle(s),
            canDropItem,
            onDropItem,
            style
        } = this.props;

        return (
            <GenericAssignmentDropTarget
                canDropItem={(a) => canDropItem ? canDropItem(a as DroppableItem) : false}
                onDropItem={(a) => onDropItem && onDropItem(a)}
                style={style}
                computeStyle={computeStyle}>
                {this.props.children}
            </GenericAssignmentDropTarget>
        );
    }
}

