import * as React from 'react';
import TimelineLegend from '../TimelineLegend';
import './TimelineToolsPanel.css';
interface TimelineToolsPanelProps {
    titleText?: string;
    legendChildren?: React.ReactNode;
    isScheduleTimeline?: boolean;
}

export default class TimelineToolsPanel extends React.PureComponent<TimelineToolsPanelProps> {
    render() {
        const {
            legendChildren,
            titleText = 'Tools',
            isScheduleTimeline = false
        } = this.props;
    
        return (
            <div className="timeline-tools-panel">
                <div className={`timeline-tools-title-background ${isScheduleTimeline ? ' schedule' : ''}`}>
                    <h3 className="timeline-tools-title">
                        {titleText}
                    </h3>
                </div>
                <div className="timeline-tools-children">
                    {this.props.children}
                </div>

                {legendChildren && (
                    <TimelineLegend >
                        {legendChildren}
                    </TimelineLegend>
                )}
            </div>
        );
    }
}
