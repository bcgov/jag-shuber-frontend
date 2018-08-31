import * as React from 'react';
import { ReactCalendarTimelineItemProps } from 'react-calendar-timeline';

export interface TimelineCardProps extends Partial<ReactCalendarTimelineItemProps> {
    onClick?: () => void;
    style?: React.CSSProperties;
}

export default class TimelineCard extends React.PureComponent<TimelineCardProps, any>{


    private static NoOpMouseHandler: React.MouseEventHandler<any> = (e) => {
        e.stopPropagation();
    }

    private static NoOpTouchHandler: React.TouchEventHandler<any> = (e) => {
        e.stopPropagation();
    }


    render() {
        // The following No-op handlers are here to prevent the CalendarTimeline's default
        // mouse handling behavior (which was breaking all of our beautiful drag and drop)
        // We happen to be handling a lot of our own mouse events via redux, but in the future
        // if we'd like take advantage of the CalendarTimeline's editing features (i.e. drag resize, etc)
        // then we'll need to revisit this.
        const {
            children,
            style = {},
            className = '',
            onClick = TimelineCard.NoOpMouseHandler,
            onContextMenu = TimelineCard.NoOpMouseHandler,
            onDoubleClick = TimelineCard.NoOpMouseHandler,
            onMouseDown = TimelineCard.NoOpMouseHandler,
            onMouseUp = TimelineCard.NoOpMouseHandler,
            onTouchEnd = TimelineCard.NoOpTouchHandler,
            onTouchStart = TimelineCard.NoOpTouchHandler
        } = this.props;
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexFlow: 'column nowrap',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    ...style
                }}
                onClick={onClick}
                onContextMenu={onContextMenu}
                onDoubleClick={onDoubleClick}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onTouchEnd={onTouchEnd}
                onTouchStart={onTouchStart}
                className={`timeline-card ${className}`}
            >
                {children}
            </div>
        );
    }
}
