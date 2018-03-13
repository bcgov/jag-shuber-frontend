// Type definitions for react-calendar-timeline v0.8.1
// Project: https://github.com/namespace-ee/react-calendar-timeline
// Definitions by: Rajab Shakirov <https://github.com/radziksh>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

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

    export interface ReactCalendarTimelineItem {
        id: number;
        group: number;
        title?: React.ReactNode;
        start_time: any;
        end_time: any;
        canMove?: boolean;
        canResize?: boolean;
        canChangeGroup?: boolean;
        className?: string;
    }

    export interface ReactCalendarTimelineGroup {
        id: number;
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

    interface ReactCalendarTimelineProps {
        groups: ReactCalendarTimelineGroup[];
        items: ReactCalendarTimelineItem[];
        keys?: ReactCalendarTimelineKeys;
        sidebarContent?: React.ReactNode;
        sidebarWidth?: number;
        rightSidebarContent?: React.ReactNode;
        rightSidebarWidth?: number;
        dragSnap?: number;
        minResizeWidth?: number;
        fixedHeader?: "fixed" | "none";
        fullUpdate?: boolean;
        zIndexStart?: number;
        lineHeight?: number;
        headerLabelGroupHeight?: number;
        headerLabelHeight?: number;
        itemHeightRatio?: number;
        minZoom?: number;
        maxZoom?: number;
        canMove?: boolean;
        canChangeGroup?: boolean;
        canResize?: boolean;
        useResizeHandle?: boolean;
        stackItems?: boolean;
        traditionalZoom?: boolean;
        itemTouchSendsClick?: boolean;
        headerLabelFormats?: HeaderLabelFormats;
        subHeaderLabelFormats?: HeaderLabelFormats;
        onItemMove?(itemId: any, dragTime: any, newGroupOrder: any): any;
        onItemResize?(itemId: any, newResizeEnd: any): any;
        onItemSelect?(itemId: any): any;
        onItemClick?(itemId: any): any;
        onCanvasClick?(groupId: any, time: any, e: any): any;
        onItemDoubleClick?(itemId: any): any;
        moveResizeValidator?(action: any, itemId: any, time: any): any;
        defaultTimeStart?: any;
        defaultTimeEnd?: any;
        visibleTimeStart?: any;
        visibleTimeEnd?: any;
        onTimeChange?(visibleTimeStart: any, visibleTimeEnd: any, updateScrollCanvas: (start: number, end: number) => void): any;
        onTimeInit?(visibleTimeStart: any, visibleTimeEnd: any): any;
        onBoundsChange?(canvasTimeStart: any, canvasTimeEnd: any): any;
        children?: any;
        itemRenderer?: (props: { item: ReactCalendarTimelineItem }) => React.ReactNode;
        groupRenderer?: (props: { group: ReactCalendarTimelineGroup }) => React.ReactNode;
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
        ReactCalendarTimelineItem
    } from 'react-calendar-timeline'
}