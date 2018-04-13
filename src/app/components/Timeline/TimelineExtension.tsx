import * as React from 'react';
import {
    ReactCalendarTimelineExtension,
} from 'react-calendar-timeline/lib';
import { ReactCalendarTimelineGroup } from 'react-calendar-timeline';

interface TimelineExtensionProps extends Partial<ReactCalendarTimelineExtension> {
}

export default abstract class TimelineExtension extends React.Component<TimelineExtensionProps> {

    private static getValues(arr?: any[]): any[] {
        return arr ? Object.keys(arr).map(k => arr[k]) : [];
    }

    // only repaint if something really changes
    shouldComponentUpdate(nextProps: TimelineExtensionProps) {
        return nextProps.canvasTimeStart !== this.props.canvasTimeStart ||
            nextProps.canvasTimeEnd !== this.props.canvasTimeEnd ||
            nextProps.canvasWidth !== this.props.canvasWidth ||
            TimelineExtension.getValues(nextProps.groupHeights).join(',') 
                !== TimelineExtension.getValues(this.props.groupHeights).join(',');
    }

    abstract getItemRenderer(extensionProps: TimelineExtensionProps): 
        (group: ReactCalendarTimelineGroup, index: number, array?: ReactCalendarTimelineGroup[]) => React.ReactNode;

    render() {
        const {
            groups = [],
        } = this.props;

        const itemRenderer = this.getItemRenderer(this.props);

        return (
            <div style={{ display: 'absolute' }}>
                {groups.map(itemRenderer)}
            </div>
        )
    }
}