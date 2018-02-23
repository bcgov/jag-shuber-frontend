import * as React from 'react'
import { SheriffDropResult, DraggedSheriff } from './SheriffDragSource'
import {
    default as dropTargetFactory,
    DragDropStatus
} from '../infrastructure/DragDrop/dropTargetFactory';
import ItemTypes from '../infrastructure/DragDrop/ItemTypes';
import { Sheriff } from '../api';

type DroppableItem = Sheriff;

const GenericAssignmentDropTarget = dropTargetFactory<DroppableItem, void>(ItemTypes.SHERIFF);

interface SheriffDropTargetProps {
    canDropItem?: (item: DroppableItem) => boolean;
    onDropItem: (item: DroppableItem) => void;
    style?: React.CSSProperties;
    computeStyle?: (status: { isActive: boolean, isOver: boolean, canDrop: boolean }) => React.CSSProperties;
}

export default class SheriffDropTarget extends React.PureComponent<SheriffDropTargetProps> {

    canDropItem(sheriff: DraggedSheriff) {
        // return sheriff.onDuty !== this.props.onDuty;
        return true;
    }

    onDropItem(dragged: DraggedSheriff): SheriffDropResult {
        return {
            ...dragged
        }
    }

    computeStyle({ isActive, isOver, canDrop }: DragDropStatus): React.CSSProperties {
        let css: React.CSSProperties = {
            zIndex: 70
        };

        if (isActive) {
            css.zIndex = 90;
            css.backgroundImage = 'repeating-linear-gradient(-45deg, #9F9A,#9F9A 20px, #0B0A 20px, #0B0A 40px)'            
        } else if (canDrop) {
            css.zIndex = 90;
            css.backgroundColor = 'transparent'
            //css.backgroundImage = 'repeating-linear-gradient(-45deg, #ADAA,#ADAA 20px, #080A 20px, #080A 40px)'            
        } else if (isOver && !canDrop) {
            css.zIndex = 90;
            css.backgroundImage = 'repeating-linear-gradient(-45deg, #F00B,#F00B 20px, #F99B 20px, #F99B 40px)'
        }

        return css;
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

