import * as React from 'react'
import {
    ReactCalendarTimelineExtension as TimelineExtensionProps,  
} from 'react-calendar-timeline/lib'
import AssignmentRow from './DroppableAssignmentRow';

function getValues(arr?: any[]): any[] {
    return arr ? Object.keys(arr).map(k => arr[k]) : [];
}

interface DroppableRegionsProps extends Partial<TimelineExtensionProps> {
}

export default class DroppableAssignmentRows extends React.Component<DroppableRegionsProps> {
    // only repaint if something really changes
    shouldComponentUpdate(nextProps: TimelineExtensionProps) {
        return nextProps.canvasTimeStart !== this.props.canvasTimeStart ||
            nextProps.canvasTimeEnd !== this.props.canvasTimeEnd ||
            nextProps.canvasWidth !== this.props.canvasWidth ||
            getValues(nextProps.groupHeights).join(',') !== getValues(this.props.groupHeights).join(',')
    }

    render() {
        const {
            groupTops = [],
            groupHeights = [],
            canvasWidth,
            groups = [],
        } = this.props

        const backgrounds = groups.map((group, index) => {
            return (
                <AssignmentRow
                    key={index}
                    top={groupTops[index]}
                    height={groupHeights[index]}
                    width={canvasWidth}
                    targetId={group.id}
                />
            );
        });

        return (
            <div style={{ display: 'absolute' }}>
                {backgrounds}
            </div>
        )
    }
}