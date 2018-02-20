import * as React from 'react'

export interface TimelineCardProps {
    onClick?: () => void;
}

export default class TimelineCard extends React.PureComponent<TimelineCardProps, any>{
    render() {
        const { children } = this.props;
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', flexFlow: 'column nowrap', lineHeight: "15px", width: "100%", height: "100%", position: "absolute" }}>
                {children}
            </div>
        );
    }
}
