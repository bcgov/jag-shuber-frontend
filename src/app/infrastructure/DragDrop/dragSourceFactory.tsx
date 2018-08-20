import React from 'react';
import { DragSource, DragSourceSpec } from 'react-dnd';
import { CSSProperties } from 'react';
import { ItemType } from './ItemTypes';
import { getEmptyImage } from 'react-dnd-html5-backend';

export default function dragSourceFactory
    <T, TDrag, TDropResult>(itemType: ItemType | ((props: any) => string), styleOverride?: CSSProperties) {

    const sourceCallbacks: DragSourceSpec<GenericDragSourceProps, {}, GenericDragSource, any> = {
        beginDrag: (props, monitor): TDrag => {
            const { getDragData = () => ({} as TDrag), beginDrag } = props;
            const data = getDragData();
            if (beginDrag) {
                beginDrag(data);
            }
            return data;
        },
        endDrag: (props: GenericDragSourceProps, monitor) => {
            const { endDrag } = props;

            if (endDrag && monitor) {
                let result = monitor.getDropResult() as TDropResult;
                endDrag(result);
            }
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
        getDragData?: () => TDrag;
        endDrag?: (result?: TDropResult) => void;
        beginDrag?: (item: TDrag) => void;
        connectDragSource?: any;
        connectDragPreview?: any;
        isDragging?: boolean;
        style?: CSSProperties;
    }

    @DragSource<GenericDragSourceProps & T, any, GenericDragSource, any, any>(itemType, sourceCallbacks, collect)
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
                })
            }
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
