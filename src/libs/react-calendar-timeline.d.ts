// Type definitions for react-calendar-timeline v0.19.0
// Project: https://github.com/namespace-ee/react-calendar-timeline
// Definitions by: Colter Mcquay <https://github.com/cjam>

/// <reference types="react"/>
declare module "react-calendar-timeline" {

    interface ReactCalendarTimelineKeys {
        groupIdKey: string;
        groupTitleKey: string;
        itemIdKey: string;
        itemTitleKey: string;
        itemGroupKey: string;
        itemTimeStartKey: string;
        itemTimeEndKey: string;
    }

    export interface ReactCalendarTimelineTimeSteps {
        second: number;
        minute: number;
        hour: number;
        day: number;
        month: number;
        year: number;
    }

    export interface ReactCalendarTimelineItem {
        id: number | string;
        group: number | string;
        title?: React.ReactNode;
        start_time: any;
        end_time: any;
        canMove?: boolean;
        canResize?: boolean;
        canChangeGroup?: boolean;
        className?: string;
        style?:React.CSSProperties;
    }

    export interface ReactCalendarTimelineGroup {
        id: number | string;
        title: React.ReactNode;
    }

    export interface ReactCalendarTimelineExtension {
        canvasTimeStart: number;
        canvasTimeEnd: number;
        canvasWidth: number;
        visibleTimeStart: number;
        visibleTimeEnd: number;
        height: number;
        headerHeight: number;
        groupHeights: number[];
        groupTops: number[];
        dimensionItems: {
            id: number;
            dimensions: {
                width: number;
                height: number;
                left: number;
            }
        }[]
        selected: number[];
        timeSteps: number[];
        groups: ReactCalendarTimelineGroup[];
        items: ReactCalendarTimelineItem[];
        keys?: ReactCalendarTimelineKeys;
    }

    export interface ReactCalendarTimelineContext {
        timelineWidth: number;
        visibleTimeStart: number;
        visibleTimeEnd: number;
        canvasTimeStart: number;
        canvasTimeEnd: number;

    }

    export interface ReactCalendarTimelineItemContext {
        dimensions: {
            top: number;
            order: number;
            stack: boolean;
            height: number;
            isDragging: boolean;
        },
        useResizeHandle: boolean;
        title: string;
        canMove: boolean;
        canResizeLeft: boolean;
        canResizeRight: boolean;
        selected: boolean;
        dragging?: boolean;
        dragStart?: { x: number, y: number };
        dragTime?: number;
        dragGroupDelta?: number;
        resizing?: boolean;
        resizeEdge?: number;
        resizeStart?: number;
        resizeTime?: number;
        width: number;
    }

    export interface ReactCalendarTimelineItemProps {
        className: string;
        onMouseDown: React.MouseEventHandler<any>;
        onMouseUp: React.MouseEventHandler<any>;
        onTouchStart: React.TouchEventHandler<any>;
        onTouchEnd: React.TouchEventHandler<any>;
        onDoubleClick: React.MouseEventHandler<any>;
        onContextMenu: React.MouseEventHandler<any>;
        style: React.CSSProperties;
    }

    export interface ReactCalendarTimelineItemRendererProps {
        item: ReactCalendarTimelineItem;
        timelineContext: ReactCalendarTimelineContext;
        itemContext: ReactCalendarTimelineItemContext;
        getItemProps(props?: Partial<ReactCalendarTimelineItemProps>): ReactCalendarTimelineItemProps & { key: number | string, ref: any }
        getResizeProps(props?: { leftStyle?: React.CSSProperties, rightStyle?: React.CSSProperties }): { left: { ref: any, style: React.CSSProperties }, right: { ref: any, style: React.CSSProperties } };
    }

    type ItemEventHandler = (itemId: number | string, e: React.SyntheticEvent<any>) => void;

    // The following interface was built from the proptypes here:
    // https://github.com/namespace-ee/react-calendar-timeline/blob/8cf6f579ad9f7227dc8b459e2f606cfd39e7d3bd/src/lib/Timeline.js#L37-L163
    interface ReactCalendarTimelineProps {
        groups: ReactCalendarTimelineGroup[];
        items: ReactCalendarTimelineItem[];
        sidebarWidth?: number;
        sidebarContent?: React.ReactNode;
        rightSidebarWidth?: number;
        rightSidebarContent?: React.ReactNode;
        dragSnap?: number;
        minResizeWidth?: number;
        stickyOffset?: number;
        stickyHeader?: boolean;
        lineHeight?: number;
        headerLabelGroupHeight?: number;
        headerLabelHeight?: number;
        itemHeightRatio?: number;

        minZoom?: number;
        maxZoom?: number;

        clickTolerance?: number;

        canChangeGroup?: boolean;
        canMove?: boolean;
        canResize?: boolean;
        useResizeHandle?: boolean;
        canSelect?: boolean;

        stackItems?: boolean;

        traditionalZoom?: boolean;

        itemTouchSendsClick?: boolean;

        horizontalLineClassNamesForGroup?(args: any): any;  // todo: Improve this

        onItemMove?(itemId: any, dragTime: any, newGroupOrder: any): any;
        onItemResize?(itemId: any, newResizeEnd: any): any;
        onItemClick?(itemId: any): any;
        onItemSelect?(itemId: any): any;
        onItemDeselect?(itemId: any): any;
        onCanvasClick?(groupId: any, time: any, e: any): any;
        onItemDoubleClick?(itemId: any): any;
        onItemContextMenu?(itemId: any): any;
        onCanvasDoubleClick?(groupId: any, time: any, e: any): any;
        onCanvasContextMenu?(groupId: any, time: any, e: any): any;
        onZoom?(args: any): any; // todo: improve this

        moveResizeValidator?(action: any, itemId: any, time: any): any;

        itemRenderer?: (props: ReactCalendarTimelineItemRendererProps) => React.ReactNode;
        groupRenderer?: (props: { group: ReactCalendarTimelineGroup }) => React.ReactNode;

        style?: React.CSSProperties

        keys?: ReactCalendarTimelineKeys;
        headerRef?(args: any): any; // todo: improve
        scrollRef?(args: any): any; // todo: improve

        timeSteps?: ReactCalendarTimelineTimeSteps;

        defaultTimeStart?: any;
        defaultTimeEnd?: any;

        visibleTimeStart?: any;
        visibleTimeEnd?: any;
        onTimeChange?(visibleTimeStart: any, visibleTimeEnd: any, updateScrollCanvas: (start: number, end: number) => void): any;
        onBoundsChange?(canvasTimeStart: any, canvasTimeEnd: any): any;

        selected?: (number | string)[];
        headerLabelFormats?: HeaderLabelFormats;
        subHeaderLabelFormats?: HeaderLabelFormats;

        children?: any;
    }

    export interface HeaderLabelFormats {
        yearShort: string;
        yearLong: string;
        monthShort: string;
        monthMedium: string;
        monthMediumLong: string;
        monthLong: string;
        dayShort: string;
        dayLong: string;
        hourShort: string;
        hourMedium: string;
        hourMediumLong: string;
        hourLong: string;
        time: string;
    }

    class ReactCalendarTimeline extends React.Component<ReactCalendarTimelineProps>{
        static defaultProps: Partial<ReactCalendarTimelineProps>;
    }

    export const defaultHeaderLabelFormats: HeaderLabelFormats;
    export const defaultSubHeaderLabelFormats: HeaderLabelFormats;

    export class TimelineMarkers extends React.Component{

    }

    export class TodayMarker extends React.Component{
        
    }

    // let ReactCalendarTimeline : React.ClassicComponentClass<ReactCalendarTimelineProps>;
    export default ReactCalendarTimeline;
}

// This project also exports a /lib with the bundled contents suitable for webpack
declare module 'react-calendar-timeline/lib' {
    export {
        default,
        HeaderLabelFormats,
        ReactCalendarTimelineExtension,
        ReactCalendarTimelineGroup,
        ReactCalendarTimelineItem,
        ReactCalendarTimelineItemRendererProps
    } from 'react-calendar-timeline'
}