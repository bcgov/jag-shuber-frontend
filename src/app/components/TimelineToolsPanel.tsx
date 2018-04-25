import * as React from 'react';
import TimelineLegend from './TimelineLegend';

interface TimelineToolsPanelProps {
    titleText?: string;
    legendChildren?: React.ReactNode;
}

export default class TimelineToolsPanel extends React.PureComponent<TimelineToolsPanelProps> {
    render() {
        const {
            legendChildren,
            titleText = 'Tools'
        } = this.props;

        return (
            <div
                style={{
                    flex: '0 200px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    borderLeft: '2px solid #BBB',
                    borderBottom: '1px solid #BBB'
                }}
            >
                <div
                    style={{
                        background: '#003366',
                        flex: '0 0 60px',
                        border: '0px',
                        color: '#FFF',
                        textAlign: 'center'
                    }}
                >
                    <h3
                        style={{
                            lineHeight: '60px',
                            padding: 0,
                            margin: 0,
                            color: '#FFF'
                        }}
                    >
                        {titleText}
                    </h3>
                </div>
                <div
                    style={{
                        flex: '1 1 auto',
                        overflowY: 'auto'
                    }}
                >
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
