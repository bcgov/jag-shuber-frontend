
import * as React from 'react';
import { ItemType } from './ItemTypes';
import { XYCoord, DragLayer } from 'react-dnd';
import { Sheriff, SheriffDuty } from '../../api';
import SheriffDragCard from '../../components/SheriffDragCard/SheriffDragCard';

export interface CustomDragLayerProps {
    item?: any;
    itemType?: ItemType;
    initialOffset?: XYCoord;
    currentOffset?: XYCoord;
    isDragging?: boolean;
}

const layerStyles: React.CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
};

function getItemStyles(props: CustomDragLayerProps) {
    const { initialOffset, currentOffset } = props;
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        };
    }

    let { x, y } = currentOffset;

    // if (props.snapToGrid) {
    //     x -= initialOffset.x
    //     y -= initialOffset.y
    //         ;[x, y] = snapToGrid(x, y)
    //     x += initialOffset.x
    //     y += initialOffset.y
    // }

    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform,
    };
}

class CustomDragLayer extends React.Component<CustomDragLayerProps> {

    private renderItem() {
        const { itemType, item } = this.props;
        let renderedItem = null;

        switch (itemType) {
            case 'Sheriff':
                const sheriff = item as Sheriff;
                renderedItem = <SheriffDragCard sheriff={sheriff} />;
                break;            
            case 'SheriffDuty':
                const duty = item as SheriffDuty;
                renderedItem =(
                    <div>
                        <h2>Duty: {duty.dutyId}</h2>
                        <h2>Sheriff: {duty.sheriffId}</h2>
                    </div>
                );
                break;
            default:
                renderedItem = null;
                break;
        }
        return renderedItem;
    }

    public render() {
        const { isDragging } = this.props;

        if (!isDragging) {
            return null;
        }
        return (
            <div style={layerStyles}>
                <div style={getItemStyles(this.props)}>{this.renderItem()}</div>
            </div>
        );
    }
}


export default DragLayer<CustomDragLayerProps, any, CustomDragLayer, any>(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
}))(CustomDragLayer);

