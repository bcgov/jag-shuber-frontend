import React from 'react';
import { DragSource, DragSourceSpec } from 'react-dnd';
import { CSSProperties } from 'react';
import { ItemType } from './ItemTypes';
import { getEmptyImage } from 'react-dnd-html5-backend';

export default function dragSourceFactory
    <T, TDrag extends { id: string }, TDropResult>(itemType: ItemType | ((props: any) => string), styleOverride?: CSSProperties) {

    const sourceCallbacks: DragSourceSpec<GenericDragSourceProps, TDrag> = {
        beginDrag: (props, monitor): TDrag => {
            const { data = {}, beginDrag } = props;
            if (beginDrag) {
                // The setTimeout is necessary here as we need to handle
                // operations on the next tick (i.e. let the drag and drop backend
                // have a chance to go through its regular beginDrag flow before 
                // we potentially allow the consumer of this api to change the state)
                setTimeout(() => beginDrag(data as TDrag), 0);
            }
            return data as TDrag;
        },
        endDrag: (props: GenericDragSourceProps, monitor) => {
            const { endDrag } = props;
            if (endDrag && monitor) {
                let result = monitor.getDropResult() as TDropResult;

                // The setTimeout is necessary here as we need to handle
                // operations on the next tick (i.e. let the drag and drop backend
                // have a chance to go through its regular endDrag flow before 
                // we potentially allow the consumer of this api to change the state)
                setTimeout(() => endDrag(result), 0);
            }
        },
        canDrag: (props: GenericDragSourceProps, monitor) => {
            const { canDrag } = props;
            return canDrag ? canDrag() : true;
        },
        isDragging: (props: GenericDragSourceProps, monitor) => {
            const { id: itemId } = monitor.getItem() as TDrag;
            const type = monitor.getItemType();
            const { data: { id } } = props;
            return type === itemType && id != undefined && id === itemId;
        }
    };

    function collect(connect: any, monitor: any) {
        return {
            connectDragSource: connect.dragSource(),
            connectDragPreview: connect.dragPreview(),
            isDragging: monitor.isDragging()
        };
    }

    interface GenericDragSourceProps {
        data: TDrag;
        // getDragData?: () => TDrag;
        beginDrag?: (item: TDrag) => void;
        endDrag?: (result?: TDropResult) => void;
        canDrag?: () => boolean;

        connectDragSource?: any;
        connectDragPreview?: any;
        isDragging?: boolean;
        style?: CSSProperties;
    }

    @DragSource<GenericDragSourceProps & T, any>(itemType, sourceCallbacks, collect)
    class GenericDragSource extends React.PureComponent<GenericDragSourceProps & T, {}> {
        componentDidMount() {
            const { connectDragPreview } = this.props;
            if (connectDragPreview) {
                // Use empty image as a drag preview so browsers don't draw it
                // and we can draw whatever we want on the custom drag layer instead.
                connectDragPreview(getEmptyImage(), {
                    // IE fallback: specify that we'd rather screenshot the node
                    // when it already knows it's being dragged so we can hide it with CSS.
                    captureDraggingState: true,
                });
            }
        }

        componentWillUnmount() {
            console.log('unmounting', this.props.data);
        }
        render() {
            const {
                connectDragSource,
                children
            } = this.props;

            return connectDragSource(
                <div>
                    {children}
                </div>
            );
        }
    }

    return GenericDragSource;
}
