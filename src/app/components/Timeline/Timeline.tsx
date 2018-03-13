import * as React from 'react';
import {
    default as ReactTimeline,
    // HeaderLabelFormats,
    ReactCalendarTimelineGroup as TimelineGroupProps,
    ReactCalendarTimelineItem as TimelineItemProps,
    HeaderLabelFormats
} from 'react-calendar-timeline/lib';
import './Timeline.css';
import TimelineCard from './TimelineCard';

export type TimelineGroup<T> = TimelineGroupProps & T;
export type TimelineItem<T> = TimelineItemProps & T;

interface TimelineItemGroupProps<TItem, TGroup> {
    groups: TGroup[];
    items: TItem[];
    mapItem?: (item: TItem, groups: TGroup[]) => TimelineItem<TItem>;
    mapItems?: (items: TItem[], groups: TGroup[]) => TimelineItem<TItem>[];
    mapGroup?: (group: TGroup) => TimelineGroup<TGroup>;
    mapGroups?: (groups: TGroup[]) => TimelineGroup<TGroup>[];
    groupRenderer?: (group: (TimelineGroup<TGroup>)) => React.ReactNode;
    itemRenderer?: (item: TimelineItem<TItem>) => React.ReactNode;
}

export interface TimelineComponentProps<TItem, TGroup> extends TimelineItemGroupProps<TItem, TGroup>, TimelineProps {
    sideBarHeaderComponent?: (props: TimelineComponentProps<TItem, TGroup>) => JSX.Element;
}

export interface TimelineProps {
    showTime?: boolean;
    showHeader?: boolean;
    sideBarHeaderComponent?: (props: TimelineProps) => JSX.Element;
    sideBarHeaderTitle?: string;
    sidebarWidth?: number;
    lineHeight?: number;
    visibleTimeStart?: any;
    visibleTimeEnd?: any;
    onVisibleTimeChange?: (visibleTimeStart: number, visibleTimeEnd: number) => void;
    itemHeightRatio?: number;
    allowChangeTime?: boolean;
}

export default class Timeline<TItem, TGroup> extends React.PureComponent<TimelineComponentProps<TItem, TGroup>> {
    protected _timelineRef: any;

    render() {
        const headerLabelFormats: Partial<HeaderLabelFormats> = {
            ...ReactTimeline.defaultProps.headerLabelFormats,
            dayLong: 'dddd LL',
        };
        const {
            groups = [],
            items = [],
            visibleTimeStart,
            visibleTimeEnd,
            sideBarHeaderComponent = ({ sideBarHeaderTitle }: TimelineComponentProps<TItem, TGroup>) => (
                <div style={{ paddingTop: 10, fontSize: 20, alignContent: 'center' }}>
                    {sideBarHeaderTitle}
                </div>
            ),
            showHeader = true,
            showTime = true,
            sidebarWidth = 150,
            lineHeight = 60,
            itemHeightRatio = 0.9,
            mapGroups = (groupsToMap: TGroup[]) => this.mapGroups(groupsToMap),
            mapItems = (itemsToMap: TItem[], groupings: TGroup[]) => this.mapItems(itemsToMap, groupings)
        } = this.props;

        const mappedGroups = mapGroups(groups);
        const mappedItems = mapItems(items, mappedGroups);

        return (
            <ReactTimeline
                headerLabelGroupHeight={showHeader ? undefined : 0}
                headerLabelHeight={showHeader && showTime ? undefined : 0}
                groups={mappedGroups}
                items={mappedItems}
                headerLabelFormats={headerLabelFormats as HeaderLabelFormats}
                visibleTimeStart={visibleTimeStart}
                visibleTimeEnd={visibleTimeEnd}
                onTimeChange={(s, e, cb) => this.handleTimeChange(s, e, cb)}
                canMove={false}
                canResize={false}
                canChangeGroup={false}
                stackItems={true}
                lineHeight={lineHeight}
                sidebarWidth={sidebarWidth}
                itemTouchSendsClick={true}
                sidebarContent={sideBarHeaderComponent(this.props)}
                traditionalZoom={true}
                itemHeightRatio={itemHeightRatio}
                itemRenderer={({ item }: { item: TimelineItemProps & TItem }) => this.renderItem(item)}
                groupRenderer={({ group }: { group: TimelineGroupProps & TGroup }) => this.renderGroup(group)}
                ref={(t) => this._timelineRef = t}
            >
                {this.getExtensions()}
                {this.props.children}
            </ReactTimeline>
        );
    }

    private handleTimeChange(start: number, end: number, callback: (s: number, e: number) => void) {
        const {
            onVisibleTimeChange,
            allowChangeTime = true,
            visibleTimeEnd,
            visibleTimeStart
        } = this.props;

        if (allowChangeTime) {
            callback(start, end);
            if (onVisibleTimeChange) {
                onVisibleTimeChange(start, end);
            }
        } else {
            if (visibleTimeStart && visibleTimeEnd) {
                callback(visibleTimeStart, visibleTimeEnd);
            }
        }
    }

    private mapGroups(groups: TGroup[]): TimelineGroup<TGroup>[] {
        const {
            mapGroup = (group: TGroup) => this.mapGroup(group)
        } = this.props;
        return groups ? groups.map(mapGroup) : [];
    }

    private mapItems(items: TItem[], groups: TGroup[]): TimelineItem<TItem>[] {
        const {
            mapItem = (item: TItem, groupsContext: TGroup[]) => this.mapItem(item, groupsContext)
        } = this.props;
        return items ? items.map((i) => mapItem(i, groups)) : [];
    }

    private mapGroup(group: TGroup): TimelineGroup<TGroup> {
        return group as TimelineGroup<TGroup>;
    }

    private mapItem(item: TItem, groups: TGroup[]): TimelineItem<TItem> {
        return item as TimelineItem<TItem>;
    }

    private renderGroup(group: (TimelineGroupProps & TGroup)): React.ReactNode {
        const { groupRenderer } = this.props;
        const { title = 'Untitled' } = group;
        if (groupRenderer) {
            return groupRenderer(group);
        } else {
            return (
                <div style={{ fontSize: 16 }}>{title}</div>
            );
        }
    }
    private renderItem(item: (TimelineItemProps & TItem)): React.ReactNode {
        const {
            itemRenderer = ({ title }: TimelineItemProps & TItem) => (
                <div>{title}</div>
            )
        } = this.props;
        return (
            <TimelineCard>
                {itemRenderer(item)}
            </TimelineCard>
        );
    }

    private getExtensions(): undefined | React.ReactNode | React.ReactNode[] {
        return null;
    }
}
