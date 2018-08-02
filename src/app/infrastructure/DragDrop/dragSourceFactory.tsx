import React from 'react';
import { DragSource, DragSourceSpec } from 'react-dnd';
import { CSSProperties } from 'react';
import { ItemType } from './ItemTypes';

export default function dragSourceFactory
    <T, TDrag, TDropResult>(itemType: ItemType | ((props: any) => string), styleOverride?: CSSProperties) {

    const sourceCallbacks: DragSourceSpec<GenericDragSourceProps> = {
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
    }

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

    @DragSource<GenericDragSourceProps & T>(itemType, sourceCallbacks, collect)
    class GenericDragSource extends React.PureComponent<GenericDragSourceProps & T, {}> {
        render() {
            const {
                connectDragSource,
                children,
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
