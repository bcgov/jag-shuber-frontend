import * as React from 'react';
import './ScheduleSummary.css';
import { Glyphicon } from 'react-bootstrap';

export enum StatusEnum {
    GOOD,
    BAD,
    WARNING,
    EMPTY
}
export interface ScheduleSummaryProps {
    weekStatus: {
        sunday?: StatusEnum;
        monday?: StatusEnum;
        tuesday?: StatusEnum;
        wednesday?: StatusEnum;
        thursday?: StatusEnum;
        friday?: StatusEnum;
        saturday?: StatusEnum;
    };
}
export default class ScheduleSummary extends React.PureComponent<ScheduleSummaryProps, {}> {
    getDayInfo(status: StatusEnum, day: string) {
        switch (status) {
            case StatusEnum.GOOD:
                return (
                    <div className="schedule-summary-day good-day non-empty-day">
                        <Glyphicon glyph="ok" />
                    </div>
                );
            case StatusEnum.BAD:
                return (
                    <div className="schedule-summary-day bad-day non-empty-day">
                        <Glyphicon glyph="remove" />
                    </div>
                );
            case StatusEnum.WARNING:
                return (
                    <div className="schedule-summary-day warning-day non-empty-day">
                        <Glyphicon glyph="alert" />
                    </div>
                );
            default:
                return (
                    <div className="schedule-summary-day empty-day">
                        {day.charAt(0).toUpperCase()}
                    </div>
                );
        }
    }

    render() {

        const { weekStatus } = this.props;
        const dayStatus = Object.keys(weekStatus).map(key => ({ key, status: weekStatus[key] }));

        return (
            <div className="schedule-summary-week" >
                {dayStatus.map(({ status, key }) => (
                    this.getDayInfo(status, key)
                ))}
            </div>
        );
    }
}
