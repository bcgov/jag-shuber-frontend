import * as React from 'react'
import {
    default as ReactTimeline,
    // HeaderLabelFormats,
    ReactCalendarTimelineGroup as TimelineGroupProps,
    ReactCalendarTimelineItem as TimelineItemProps
} from 'react-calendar-timeline/lib'
import * as moment from 'moment'
import "./Timeline.css"

type TimelineGroup<T> = TimelineGroupProps & T;
type TimelineItem<T> = TimelineItemProps & T;

export interface TimelineProps<TItem, TGroup> {
    groups: TGroup[];
    items: TItem[];
    showTime?: boolean
    showHeader?: boolean;
    sideBarHeaderComponent?: (props: TimelineProps<TItem, TGroup>) => JSX.Element;
    sideBarHeaderTitle?: string;
    sidebarWidth?: number;
    lineHeight?: number;
    visibleTimeStart?: any;
    visibleTimeEnd?: any;
    onVisibleTimeChange?: (visibleTimeStart: number, visibleTimeEnd: number) => void
    groupRenderer?: (group: (TimelineGroup<TGroup>)) => React.ReactNode;
    itemRenderer?: (item: TimelineItem<TItem>) => React.ReactNode;
}

export default class Timeline<TItem, TGroup, TOwnProps={}> extends React.PureComponent<TimelineProps<TItem, TGroup> & TOwnProps> {
    protected _timelineRef: any;

    protected mapGroups(groups: TGroup[]): TimelineGroup<TGroup>[] {
        return groups ? groups.map(this.mapGroup.bind(this)) : [];
    }

    protected mapItems(items: TItem[]): TimelineItem<TItem>[] {
        return items ? items.map(this.mapItem.bind(this)) : [];
    }

    protected mapGroup(group: TGroup): TimelineGroup<TGroup> {
        return group as TimelineGroup<TGroup>;
    }
    protected mapItem(item: TItem): TimelineItem<TItem> {
        return item as TimelineItem<TItem>;
    }

    protected renderGroup({ title }: (TimelineGroupProps & TGroup)): React.ReactNode {
        return (
            <div>{title}</div>
        )
    }

    protected renderItem({ title }: (TimelineItemProps & TItem)): React.ReactNode {
        return (
            <div>{title}</div>
        )
    }

    protected getExtensions(): undefined | React.ReactNode | React.ReactNode[] {
        return null;
    }

    render() {
        const headerLabelFormats = Object.assign({},
            ReactTimeline.defaultProps.headerLabelFormats,
            {
                dayLong: 'dddd LL',
            });
        const {
            groups = [],
            items = [],
            onVisibleTimeChange,
            visibleTimeStart = moment().subtract(2, 'hour'),
            visibleTimeEnd = moment().add(8, 'hour'),
            sideBarHeaderComponent = ({ sideBarHeaderTitle }: TimelineProps<TItem, TGroup>) => (
                <div style={{ fontSize: 20, alignContent: "center" }}>
                    {sideBarHeaderTitle}
                </div>
            ),
            showHeader = true,
            showTime = true,
            sidebarWidth = 150,
            lineHeight = 60,
            itemRenderer = (i: TimelineItem<TItem>) => this.renderItem(i),
            groupRenderer = (g: TimelineGroup<TGroup>) => this.renderGroup(g),
        } = this.props;

        return (
            <ReactTimeline
                headerLabelGroupHeight={showHeader ? undefined : 0}
                headerLabelHeight={showHeader && showTime ? undefined : 0}
                groups={this.mapGroups(groups)}
                items={this.mapItems(items)}
                headerLabelFormats={headerLabelFormats}
                visibleTimeStart={visibleTimeStart}
                visibleTimeEnd={visibleTimeEnd}
                onTimeChange={onVisibleTimeChange}
                canMove={false}
                canResize={false}
                canChangeGroup={false}
                stackItems={true}
                lineHeight={lineHeight}
                sidebarWidth={sidebarWidth}
                itemTouchSendsClick
                sidebarContent={sideBarHeaderComponent(this.props)}
                traditionalZoom
                itemHeightRatio={0.90}
                itemRenderer={({ item }: { item: TimelineItemProps & TItem }) => itemRenderer(item)}
                groupRenderer={({ group }: { group: TimelineGroupProps & TGroup }) => groupRenderer(group)}
                ref={(t) => this._timelineRef = t}
            >
                {this.getExtensions()}
                {this.props.children}
            </ReactTimeline>
        );
    }
}


