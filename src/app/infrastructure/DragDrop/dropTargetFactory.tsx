import React from 'react';
import {
    DropTarget,
    DropTargetSpec
} from 'react-dnd';
import './dragDrop.css';

export interface DragDropStatus {
    isActive?: boolean;
    isOver?: boolean;
    canDrop?: boolean;
}

export default function dropTargetFactory<TDrag, TDrop>(itemTypes: string | string[], styleOverride?: React.CSSProperties) {

    const targetCallbacks: DropTargetSpec<GenericDropTargetProps> = {
        canDrop(props, monitor) {

            let item = (monitor ? monitor.getItem() : {}) as TDrag;
            // canDropItem with a default of => true
            const { canDropItem = (_item: TDrag) => true } = props;
            return canDropItem(item);
        },
        drop(props, monitor): TDrop {
            const { onDropItem } = props;
            let result = {} as TDrop;
            if (onDropItem && monitor) {
                let item = monitor.getItem() as TDrag;
                result = onDropItem(item);
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

    interface GenericDropTargetProps {
        onDropItem?: (item: TDrag) => TDrop;
        canDropItem?: (item: TDrag) => boolean;
        connectDropTarget?: any;
        isOver?: boolean;
        canDrop?: boolean;
        style?: React.CSSProperties;
        computeStyle?: (props: { isActive?: boolean, canDrop?: boolean, isOver?: boolean }) => React.CSSProperties;
        className?: string;
        onClick?: () => void;
    }

    @DropTarget<GenericDropTargetProps>(itemTypes, targetCallbacks, collect)
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
