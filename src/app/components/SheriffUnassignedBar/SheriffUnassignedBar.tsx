import React from 'react';
import moment from 'moment';
import './SheriffUnassignedBar.css';
import {
    IdType,
    SheriffDuty,
    AssignmentDuty,
    WorkSectionCode,
    SheriffUnassignedRange
} from '../../api';
import { getWorkSectionColour } from '../../api/utils';
import SheriffDutyDropTarget from '../../containers/SheriffDutyDropTarget';
import {  } from '../../api/Api';

export interface SheriffUnassignedBarProps {
    sheriffId?: IdType;
    unassignedTimeRange: SheriffUnassignedRange;        
    sheriffDuty: SheriffDuty;
    duty: AssignmentDuty;
    dutyWorkSection?: WorkSectionCode;
    title?: string;
    onRemove?: () => void;
    style?: React.CSSProperties;
    computeStyle?: (status: { isActive: boolean, isOver: boolean, canDrop: boolean }) => React.CSSProperties;
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

        return `${sheriffDutyPercentage.toString()}%`;
    }

    private getDutyBarLeftPosition() {
        const {
            unassignedTimeRange: { startDateTime: start },
            duty: { startDateTime: dutyStart, endDateTime: dutyEnd }
        } = this.props;
        const dutyDuration: number = moment.duration(moment(dutyEnd).diff(dutyStart)).asMinutes();
        const differenceBetweenStarts: number = moment.duration(moment(start).diff(dutyStart)).asMinutes();
        const startDifferencePercentage = (differenceBetweenStarts / dutyDuration) * 100;

        return `${startDifferencePercentage.toString()}%`;
    }

    private getDutyBarTopPosition() {
        const {
            sheriffDuty,
            duty: { sheriffDuties }
        } = this.props;
        if (sheriffDuties.length > 1) {
            const index = sheriffDuties.findIndex(s => s.id === sheriffDuty.id);
            const heightPercentage = ((index / sheriffDuties.length) * 100) + (30 / sheriffDuties.length);
            return `${heightPercentage.toString()}%`;
        }
        return '42%';
    }

    render() {
        const {
            dutyWorkSection = 'OTHER',
            computeStyle,
            style = {},
            className
        } = this.props;

        return (
            <SheriffDutyDropTarget
                computeStyle={computeStyle}
                className={`sheriff-unassigned-bar ${className}`}
                style={{
                    background: `repeating-linear-gradient(to right, transparent, transparent 7px, ${getWorkSectionColour(dutyWorkSection)} 7px, ${getWorkSectionColour(dutyWorkSection)} 15px)`,
                    ...style,
                    width: this.getBarWidth(),
                    position: 'absolute',
                    left: this.getDutyBarLeftPosition(),
                    height: '15%',
                    top: this.getDutyBarTopPosition()
                }}
            >
            </SheriffDutyDropTarget>
        );
    }
}