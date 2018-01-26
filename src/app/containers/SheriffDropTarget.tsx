import * as React from 'react'
import { SheriffDropResult, DraggedSheriff } from './SheriffDragSource'
import { CSSProperties } from 'react';
import dropTargetFactory from '../infrastructure/DragDrop/dropTargetFactory';
import ItemTypes from '../infrastructure/DragDrop/ItemTypes';

const GenericAssignmentDropTarget = dropTargetFactory<DraggedSheriff, SheriffDropResult>(ItemTypes.SHERIFF);

interface SheriffDropTargetProps {
    onDuty: boolean;
    style?:CSSProperties;
    computeStyle?:(status:{isActive:boolean,isOver:boolean,canDrop:boolean})=>CSSProperties;
}

export default class SheriffDropTarget extends React.PureComponent<SheriffDropTargetProps> {

    canDropItem(sheriff: DraggedSheriff) {
        return sheriff.onDuty !== this.props.onDuty;
    }

    onDropItem(dragged: DraggedSheriff): SheriffDropResult {
        const {onDuty} = this.props;        
        return {
            badgeNumber:dragged.badgeNumer,
            onDuty
        }
    }
    render() {
        return (
            <GenericAssignmentDropTarget                 
                canDropItem={(a) => this.canDropItem(a)} 
                onDropItem={(a)=> this.onDropItem(a)}
                style={this.props.style}
                computeStyle={this.props.computeStyle}>
                {this.props.children}
            </GenericAssignmentDropTarget>
        );
    }
}

