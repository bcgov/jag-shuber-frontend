import * as React from 'react'
import {
    DropTarget,
    DropTargetSpec
} from 'react-dnd';

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
    }

    function computeStyleDefault({ isActive, canDrop, isOver }: DragDropStatus): React.CSSProperties {
        let css: React.CSSProperties = {
            borderColor: 'transparent',
            border: 'dashed',
            borderWidth: 2,
        }

        if (isActive) {
            css.borderColor = 'lightgreen'
        } else if (canDrop) {
            css.borderColor = 'black'
        } else if (isOver && !canDrop) {
            css.borderColor = '#FF000088'
        }
        return css;
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
                computeStyle = (s: DragDropStatus) => computeStyleDefault(s)
            } = this.props;

            const isActive = isOver && canDrop;

            const computedStyle = computeStyle ? computeStyle({ isActive, isOver, canDrop }) : {};

            let containerStyle = { ...style, ...computedStyle };

            return connectDropTarget(
                <div style={style}>
                    {children}
                    <div style={{ ...containerStyle, position: 'absolute', width: '100%', height: '100%', opacity: 0.8, top: 0, left: 0 }}></div>
                </div>
            )
        }
    }

    return GenericDropTarget;

}
