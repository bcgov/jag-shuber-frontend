import * as React from 'react'
import { DropTarget, DropTargetSpec } from 'react-dnd';
import { CSSProperties } from 'react';

export default function dropTargetFactory<TDrag, TDrop>(itemTypes: string | string[], styleOverride?: CSSProperties) {

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
        style?: CSSProperties;
        computeStyle?: (props: { isActive?: boolean, canDrop?: boolean, isOver?: boolean }) => CSSProperties;
    }

    @DropTarget<GenericDropTargetProps>(itemTypes, targetCallbacks, collect)
    class GenericDropTarget extends React.PureComponent<GenericDropTargetProps, {}>{

        render() {
            const {
                connectDropTarget,
                isOver,
                canDrop,
                children,
                style
            } = this.props;

            const isActive = isOver && canDrop;
            let borderColor: string = 'transparent'
            //let dropStatus = "";
            if (isActive) {
                borderColor = 'lightgreen'
            } else if (canDrop) {
                borderColor = 'black'
            } else if (isOver && !canDrop) {
                borderColor = '#FF000088'
            }

            const computedStyle = this.props.computeStyle ? this.props.computeStyle({ isActive, isOver, canDrop }) : {};
            const defaultStyle: CSSProperties = {                          
                border: 'dashed',                
                borderWidth:2,
                borderColor:borderColor
            };

            let containerStyle = Object.assign({},defaultStyle, style, computedStyle);


            return connectDropTarget(
                <div style={{ ...containerStyle }}>
                    {children}
                </div>
            )
        }
    }

    return GenericDropTarget;

}
