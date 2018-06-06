import * as React from 'react';
import './ScheduleSummary.css';
import AssignedIcon from '../Icons/Assigned';
import UnavailableIcon from '../Icons/Unavailable';
import AlertIcon from '../Icons/Alert';
import CircleIcon from '../Icons/CircleIcon';
import { Glyphicon } from 'react-bootstrap';

export enum StatusEnum {
    GOOD,
    BAD,
    WARNING,
    EMPTY,
    LOANED_IN,
    LOANED_OUT,

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
                    <AssignedIcon />
                );
            case StatusEnum.BAD:
                return (
                    <UnavailableIcon />
                );
            case StatusEnum.WARNING:
                return (
                    <AlertIcon />
                );
            case StatusEnum.LOANED_IN:
                return (
                    <CircleIcon><Glyphicon glyph="arrow-right" /></CircleIcon>
                );
            case StatusEnum.LOANED_OUT:
                return (
                    <CircleIcon><Glyphicon glyph="arrow-left" /></CircleIcon>
                );
            default:
                return (
                    <CircleIcon>{day.charAt(0).toUpperCase()}</CircleIcon>
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
