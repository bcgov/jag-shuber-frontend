import React from 'react';
import moment from 'moment';
import './SheriffUnassignedBar.css';
import {
    SheriffDuty,
    AssignmentDuty,
    WorkSectionCode,
    SheriffUnassignedRange
} from '../../api';
import { getWorkSectionColour } from '../../api/utils';
import {  } from '../../api/Api';

export interface SheriffUnassignedBarProps {
    unassignedTimeRange: SheriffUnassignedRange;        
    sheriffDuty: SheriffDuty;
    duty: AssignmentDuty;
    dutyWorkSection?: WorkSectionCode;
    style?: React.CSSProperties;
    className?: string;
}

export default class SheriffUnassignedBar extends React.PureComponent<SheriffUnassignedBarProps>{
    private getBarWidth() {
        const {
            unassignedTimeRange: { startDateTime: start, endDateTime: end },
            duty: { startDateTime: dutyStart, endDateTime: dutyEnd }
        } = this.props;
        const dutyDuration: number = moment.duration(moment(dutyEnd).diff(dutyStart)).asMinutes();
        const sheriffDutyDuration: number = moment.duration(moment(end).diff(start)).asMinutes();
        const sheriffDutyPercentage = (sheriffDutyDuration / dutyDuration) * 100;

        return `${(Math.round(sheriffDutyPercentage * 100) / 100).toString()}%`;
    }

    private getDutyBarLeftPosition() {
        const {
            unassignedTimeRange: { startDateTime: start },
            duty: { startDateTime: dutyStart, endDateTime: dutyEnd }
        } = this.props;
        const dutyDuration: number = moment.duration(moment(dutyEnd).diff(dutyStart)).asMinutes();
        const differenceBetweenStarts: number = moment.duration(moment(start).diff(dutyStart)).asMinutes();
        const startDifferencePercentage = (differenceBetweenStarts / dutyDuration) * 100;

        return `${(Math.round(startDifferencePercentage * 100) / 100).toString()}%`;
    }

    private getDutyBarTopPosition() {
        const {
            sheriffDuty,
            duty: { sheriffDuties }
        } = this.props;
        if (sheriffDuties.length > 1) {
            const index = sheriffDuties.findIndex(s => s.id === sheriffDuty.id);
            const heightPercentage = ((index / sheriffDuties.length) * 100) + (33 / sheriffDuties.length);
            return `${heightPercentage.toString()}%`;
        }
        return '42%';
    }

    render() {
        const {
            dutyWorkSection = 'OTHER',
            style = {},
            className
        } = this.props;

        return (
            <div
                onDoubleClick={(e) => {e.stopPropagation();}}
                className={`sheriff-unassigned-bar ${className}`}
                style={{
                    background: `repeating-linear-gradient(to right, transparent, transparent 7px, ${getWorkSectionColour(dutyWorkSection)} 7px, ${getWorkSectionColour(dutyWorkSection)} 15px)`,
                    ...style,
                    width: this.getBarWidth(),
                    position: 'absolute',
                    left: this.getDutyBarLeftPosition(),
                    height: '7px',
                    top: this.getDutyBarTopPosition()
                }}
            >
            </div>
        );
    }
}