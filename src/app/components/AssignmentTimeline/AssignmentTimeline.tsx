import * as React from 'react'
import { default as Timeline, TimelineProps } from "../Timeline/Timeline";
import { SheriffAssignment, Sheriff, SheriffAbility, BLANK_SHERIFF } from "../../api/index";
import { ReactCalendarTimelineGroup, ReactCalendarTimelineItem } from "react-calendar-timeline";
import { default as AssignmentTimelineCard } from './AssignmentTimelineCard'
import AssignmentDropRowExtension from './AssignmentDropRowExtension';
import toTitleCase from '../../infrastructure/toTitleCase';

// todo: find a better spot for this
export const UNASSIGNED_ID = -1;

export const UNASSIGNED_GROUP: TimelineSheriff = Object.assign({}, BLANK_SHERIFF, {
    id: UNASSIGNED_ID,
    onDuty: true,
    badgeNumber: UNASSIGNED_ID,
    abilities: SheriffAbility.All,
    title: "Unassigned"
});

type TimelineAssignment = ReactCalendarTimelineItem & SheriffAssignment;
type TimelineSheriff = ReactCalendarTimelineGroup & Sheriff;


export interface AssignmentTimelineProps extends TimelineProps<SheriffAssignment, Sheriff> {
    showUnlinkedAssignments?: boolean;
}

export default class AssignmentTimeline extends Timeline<SheriffAssignment, Sheriff, AssignmentTimelineProps>{

    static defaultProps: Partial<AssignmentTimelineProps> = {
        showUnlinkedAssignments: true,
        sideBarHeaderTitle: "Sheriffs",
        sideBarHeaderComponent: (p: AssignmentTimelineProps) => (
            <div style={{ paddingTop: 10, fontSize: 18, alignContent: "center" }}>
                {p.sideBarHeaderTitle}
            </div>
        )
    }

    static toUniqueId(id: number, groupId: number): number {
        // In order to have a unique id for the numbers, we create a number in the form
        // {assignmentId}.{sheriffId}
        return Number(`${id}.${groupId}`);
    }

    static itemIdFromUniqueId(uniqueId: number) {
        return Math.floor(uniqueId);
    }

    // Map an assignment to a timeline item
    protected mapItem(assignment: SheriffAssignment): TimelineAssignment {
        // Since We're over riding the method that uses this, we don't need it
        throw new Error("Method not implemented.");
    }

    // Map a group of assignments to timeline items
    protected mapItems(assignments: SheriffAssignment[]): TimelineAssignment[] {
        const assignmentItems = assignments.reduce<TimelineAssignment[]>((flattened, assignment, index) => {
            const { id, sheriffIds = [], startTime: start_time, endTime: end_time } = assignment;
            // If no id's, it's unassigned
            if (sheriffIds.length == 0) {
                flattened.push({ group: UNASSIGNED_ID, start_time, end_time, ...assignment } as TimelineAssignment);
            } else {
                // Here we map the multiple sheriffs that are linked with an assignment
                // To different items that will be displayed on the Timeline
                sheriffIds.map<TimelineAssignment>((gid) =>
                    Object.assign({},
                        assignment,
                        {
                            id: AssignmentTimeline.toUniqueId(id, gid),
                            group: gid,
                            start_time,
                            end_time
                        })
                ).forEach(item => {
                    flattened.push(item)
                });
            }
            return flattened;
        }, [])

        return assignmentItems;
    }

    // This method is a fix since we're using a different drag and drop framework
    // we need to manually reset the state of the timeline's view after dragging 
    // since some of the events get missed with the drag & drop
    private itemDropped() {
        if (this._timelineRef) {
            this._timelineRef.setState({ isDragging: false, dragStartPosition: null, dragLastPosition: null });
        }
    }

    protected renderItem(item: TimelineAssignment) {
        const { group, id, ...rest } = item;

        // Here we get our assignment id back from the unique ItemId
        const assignment = Object.assign(
            {
                id: AssignmentTimeline.itemIdFromUniqueId(id)
            },
            rest);
        return (
            <AssignmentTimelineCard
                onDropped={() => this.itemDropped()}
                assignment={assignment}
                currentGroupId={group} />
        );
    }

    // Map a sheriff to a timeline group
    protected mapGroup(sheriff: Sheriff): TimelineSheriff {
        const { badgeNumber: id, firstName, lastName } = sheriff;
        return Object.assign({}, { id, title: toTitleCase(`${firstName} ${lastName}`) }, sheriff);
    }

    // Map a group of sheriffs to timeline groups
    protected mapGroups(groups: Sheriff[]): TimelineSheriff[] {
        const mappedGroups = super.mapGroups(groups);
        if (this.props.showUnlinkedAssignments) {
            mappedGroups.unshift(UNASSIGNED_GROUP);
        }
        return mappedGroups;
    }

    protected renderGroup(group: TimelineSheriff) {
        return super.renderGroup(group);
    }
    protected getExtensions() {
        return (
            <AssignmentDropRowExtension />
        )
    }

}

