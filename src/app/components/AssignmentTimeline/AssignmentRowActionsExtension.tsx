import * as React from 'react';
import {
    ReactCalendarTimelineExtension as TimelineExtensionProps,
    ReactCalendarTimelineGroup,
} from 'react-calendar-timeline/lib';
import TimelineExtension from '../Timeline/TimelineExtension';
import { Button } from 'react-bootstrap';


export default class AssignmentRowActionsExtension extends TimelineExtension {
    getItemRenderer(extensionProps: TimelineExtensionProps): (group: ReactCalendarTimelineGroup, index: number, array?: ReactCalendarTimelineGroup[]) => React.ReactNode {
        const {
            groupTops = [],
            groupHeights = [],
            canvasWidth,
            dimensionItems = [],
        } = this.props;

        let width = canvasWidth;
        if (dimensionItems.length === 2) {
            width = dimensionItems[1].dimensions.left - dimensionItems[0].dimensions.left;
        }
        // Return a delegate renderer that can be used by the base extension
        return (group: ReactCalendarTimelineGroup, index: number) => (
            <div
                key={index}
                style={{
                    top: groupTops[index],
                    height: groupHeights[index],
                    width
                }}
            >
                <Button > Button </Button>
            </div>
        );
    }
}