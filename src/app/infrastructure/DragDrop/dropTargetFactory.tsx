import React from 'react';
import {
    DropTarget,
    DropTargetSpec
} from 'react-dnd';
import './dragDrop.css';
import { ItemType } from './ItemTypes';

export interface DragDropStatus {
    isActive?: boolean;
    isOver?: boolean;
    canDrop?: boolean;
}

export default function dropTargetFactory
    <TDrag, TDrop>(itemTypes: ItemType | ItemType[], styleOverride?: React.CSSProperties) {

    const targetCallbacks: DropTargetSpec<GenericDropTargetProps, {}, GenericDropTarget> = {
        canDrop(props, monitor) {
            if (monitor) {
                let item = monitor.getItem() as TDrag;
                let itemType = monitor.getItemType();
                const { itemHandlers = [] } = props;

                // If there is a handler registered for this type, use it instead of the default canDrop
                const handler = itemHandlers.find(h => h.type === itemType);
                if (handler && handler.canDropItem) {
                    return handler.canDropItem(item);
                }

                // canDropItem with a default of => true
                const { canDropItem = (_item: TDrag) => true } = props;
                return canDropItem(item);
            }
            return false;
        },
        drop(props, monitor): TDrop {
            const { onDropItem, itemHandlers = [] } = props;
            let result = {} as TDrop;
            if (monitor) {
                let item = monitor.getItem() as TDrag;
                let itemType = monitor.getItemType();
                // if there is a handler registered for this type use it instead of the default onDrop
                const handler = itemHandlers.find(h => h.type === itemType);
                if (handler && handler.onDropItem) {
                    result = handler.onDropItem(item);
                } else if (onDropItem) {
                    result = onDropItem(item);
                }
            }
            return result;
        }
    };

    function collect(connect: any, monitor: any) {
        return {
            connectDropTarget: connect.dropTarget(),
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        };
    }

    interface ItemHandler {
        type: ItemType;
        onDropItem?: (item: any) => any;
        canDropItem?: (item: any) => boolean;
    }

    interface GenericDropTargetProps {
        onDropItem?: (item: TDrag) => TDrop;
        canDropItem?: (item: TDrag) => boolean;
        itemHandlers?: ItemHandler[];
        connectDropTarget?: any;
        isOver?: boolean;
        canDrop?: boolean;
        style?: React.CSSProperties;
        computeStyle?: (props: { isActive?: boolean, canDrop?: boolean, isOver?: boolean }) => React.CSSProperties;
        className?: string;
        onClick?: () => void;
    }

    @DropTarget<GenericDropTargetProps, {}, GenericDropTarget, any>(itemTypes, targetCallbacks, collect)
    class GenericDropTarget extends React.PureComponent<GenericDropTargetProps, {}>{

        render() {
            const {
                connectDropTarget,
                isOver,
                canDrop,
                children,
                style,
                computeStyle,
                className,
                onClick
            } = this.props;

            const isActive = isOver && canDrop;

            const computedStyle = computeStyle ? computeStyle({ isActive, isOver, canDrop }) : {};

            const classNames = ['drop-target'];
            if (className) {
                classNames.push(className);
            }
            if (isOver) {
                classNames.push('is-over');
            }
            classNames.push(canDrop === true ? 'can-drop' : canDrop === false ? 'cant-drop' : '');

            return connectDropTarget(
                <div style={style} className={classNames.join(' ')} onClick={() => onClick && onClick()}>
                    {children}
                    <div className="drop-target-overlay" style={{ ...computedStyle }} />
                </div>
            );
        }
    }

    return GenericDropTarget;

}
