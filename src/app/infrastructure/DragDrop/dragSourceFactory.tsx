import * as React from 'react'
import { DragSource, DragSourceSpec } from 'react-dnd';
import { CSSProperties } from 'react';

export default function dragSourceFactory<T,TDrag, TDropResult>(itemType: string | ((props: any) => string), styleOverride?: CSSProperties) {

    const sourceCallbacks: DragSourceSpec<GenericDragSourceProps> = {
        beginDrag: (props, monitor): TDrag => {
            const { getDragData = () => ({} as TDrag) } = props;
            const data = getDragData();
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
            isDragging: monitor.isDragging()
        };
    }

    interface GenericDragSourceProps {
        getDragData?: () => TDrag;
        endDrag?: (result?: TDropResult) => void;
        connectDragSource?: any;
        isDragging?: boolean;
        style?: CSSProperties;
    }

    @DragSource<GenericDragSourceProps & T>(itemType, sourceCallbacks, collect)
    class GenericDragSource extends React.PureComponent<GenericDragSourceProps & T, {}>{

        render() {
            const {
                connectDragSource,
                children                
            } = this.props;

            return connectDragSource(
                <div >
                    {children}
                </div>
            )
        }
    }

    return GenericDragSource;
}
