import * as React from 'react'
import {
    ReactCalendarTimelineExtension as TimelineExtensionProps,
    ReactCalendarTimelineGroup,
} from 'react-calendar-timeline/lib'
import { TimelineExtension } from "../../../../components/Timeline";
import AssignmentRow from './AssignmentDropRow';


export default class AssignmentDropRowExtension extends TimelineExtension {
    getItemRenderer(extensionProps: TimelineExtensionProps): (group: ReactCalendarTimelineGroup, index: number, array?: ReactCalendarTimelineGroup[]) => React.ReactNode {
        const {
            groupTops = [],
            groupHeights = [],
            canvasWidth,
        } = this.props

        // Return a delegate renderer that can be used by the base extension
        return (group: ReactCalendarTimelineGroup, index: number) => (
            <AssignmentRow
                key={index}
                top={groupTops[index]}
                height={groupHeights[index]}
                width={canvasWidth}
                targetId={group.id}
            />
        )
    }
}