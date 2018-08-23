import React from 'react';
import { ItemType } from './ItemTypes';
import { XYCoord, DragLayer } from 'react-dnd';
import { Sheriff, SheriffDuty } from '../../api';
import SheriffDragCard from '../../components/SheriffDragCard/SheriffDragCard';
import SheriffDisplay from '../../containers/SheriffDisplay';

export interface CustomDragLayerProps {
    item?: any;
    itemType?: ItemType;
    initialOffset?: XYCoord;
    currentOffset?: XYCoord;
    pointerOffset?: XYCoord;
    offsetDelta?: XYCoord;
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
    const { initialOffset, currentOffset, pointerOffset } = props;
    if (!initialOffset || !currentOffset || !pointerOffset) {
        return {
            display: 'none',
        };
    }

    let { x, y } = pointerOffset;

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
                renderedItem = <SheriffDisplay sheriffId={duty.sheriffId} RenderComponent={SheriffDragCard} />;
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

export default DragLayer<CustomDragLayerProps>(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    pointerOffset: monitor.getClientOffset(),
    offsetDelta: monitor.getDifferenceFromInitialOffset(),
    isDragging: monitor.isDragging()
}))(CustomDragLayer);
