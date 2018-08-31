import React from 'react';
import moment from 'moment';
import './SheriffDutyBar.css';
import {
    IdType,
    SheriffDuty,
    AssignmentDuty,
    WorkSectionCode,
    Sheriff
} from '../../api';
import { getWorkSectionColour } from '../../api/utils';
import * as TimeRangeUtils from '../../infrastructure/TimeRangeUtils';
import SheriffDutyDropTarget from '../../containers/SheriffDutyDropTarget';

export interface SheriffDutyBarProps {
    sheriffId?: IdType;
    sheriffDuty: SheriffDuty;
    duty: AssignmentDuty;
    dutyWorkSection?: WorkSectionCode;
    title?: string;
    onRemove?: () => void;
    canDropSheriff?: (sheriff: Sheriff) => boolean;
    onDropSheriff?: (sheriff: Sheriff, sheriffDuty: SheriffDuty) => void;
    onDropSheriffDuty?: (sourceSheriffDuty: SheriffDuty, targetSheriffDuty: SheriffDuty) => void;
    canDropSheriffDuty?: (sheriffDuty: SheriffDuty) => boolean;
    style?: React.CSSProperties;
    computeStyle?: (status: { isActive: boolean, isOver: boolean, canDrop: boolean }) => React.CSSProperties;
    className?: string;
}

export default class SheriffDutyBar extends React.PureComponent<SheriffDutyBarProps>{
    private getDutyBarWidth() {
        const {
            sheriffDuty: { startDateTime: sheriffDutyStart, endDateTime: sheriffDutyEnd },
            duty: { startDateTime: dutyStart, endDateTime: dutyEnd }
        } = this.props;
        const dutyDuration: number = moment.duration(moment(dutyEnd).diff(dutyStart)).asMinutes();
        const sheriffDutyDuration: number = moment.duration(moment(sheriffDutyEnd).diff(sheriffDutyStart)).asMinutes();
        const sheriffDutyPercentage = (sheriffDutyDuration / dutyDuration) * 100;

        return `${sheriffDutyPercentage.toString()}%`;
    }

    private getDutyBarLeftPosition() {
        const {
            sheriffDuty: { startDateTime: sheriffDutyStart },
            duty: { startDateTime: dutyStart, endDateTime: dutyEnd }
        } = this.props;
        const dutyDuration: number = moment.duration(moment(dutyEnd).diff(dutyStart)).asMinutes();
        const differenceBetweenStarts: number = moment.duration(moment(sheriffDutyStart).diff(dutyStart)).asMinutes();
        const startDifferencePercentage = (differenceBetweenStarts / dutyDuration) * 100;

        return `${startDifferencePercentage.toString()}%`;
    }

    private getDutyBarHeight() {
        const { duty: { sheriffDuties } } = this.props;
        if (sheriffDuties.length > 0) {
            const dutyBarPercentage = (1 / sheriffDuties.length) * 100;
            return `${dutyBarPercentage.toString()}%`;
        }
        return '100%';

    }

    private getDutyBarTopPosition() {
        const {
            sheriffDuty,
            duty: { sheriffDuties }
        } = this.props;
        if (sheriffDuties.length > 0) {
            const index = sheriffDuties.findIndex(s => s.id === sheriffDuty.id);
            const heightPercentage = (index / sheriffDuties.length) * 100;
            return `${heightPercentage.toString()}%`;
        }
        return '0%';
    }

    private canAssignSheriff(sheriff: Sheriff): boolean {
        const { duty: { sheriffDuties = [] }, sheriffDuty: sheriffDutyToAssign } = this.props;
        const sdToAssignStartTime = moment(sheriffDutyToAssign.startDateTime).toISOString();
        const sdToAssignEndTime = moment(sheriffDutyToAssign.endDateTime).toISOString();

        const anyOverlap: boolean = sheriffDuties.filter(sd => sd.sheriffId === sheriff.id)
            .some(sd => TimeRangeUtils
                .doTimeRangesOverlap(
                    // tslint:disable-next-line:max-line-length
                    { startTime: moment(sd.startDateTime).toISOString(), endTime: moment(sd.endDateTime).toISOString() },
                    { startTime: sdToAssignStartTime, endTime: sdToAssignEndTime }
                ));

        return !anyOverlap;
    }

    render() {
        const {
            sheriffId,
            sheriffDuty,
            dutyWorkSection = 'OTHER',
            canDropSheriff = (s: Sheriff) => this.canAssignSheriff(s),
            onDropSheriff,
            onDropSheriffDuty,
            computeStyle,
            style = {},
            className
        } = this.props;
        const isAssigned = sheriffId != undefined && sheriffId !== '';
        const title = !this.props.title ? (isAssigned ? `Sheriff #${sheriffId}` : '') : this.props.title.toUpperCase();

        return (
            <SheriffDutyDropTarget
                onDropSheriff={(s) => onDropSheriff && onDropSheriff(s, sheriffDuty)}
                canDropSheriff={(s: Sheriff) => canDropSheriff && canDropSheriff(s)}
                onDropSheriffDuty={(sd) => onDropSheriffDuty && onDropSheriffDuty(sd, sheriffDuty)}
                canDropSheriffDuty={(sd) => sd.id != sheriffDuty.id}
                computeStyle={computeStyle}
                className={`sheriff-duty-bar ${className}`}
                style={{
                    backgroundColor: getWorkSectionColour(dutyWorkSection),
                    ...style,
                    width: this.getDutyBarWidth(),
                    position: 'absolute',
                    left: this.getDutyBarLeftPosition(),
                    height: this.getDutyBarHeight(),
                    top: this.getDutyBarTopPosition()
                }}
            >
                {isAssigned && (
                    <div style={{ margin: 'auto', fontSize: 15 }}>
                        {title}
                    </div>
                )}
            </SheriffDutyDropTarget>
        );
    }
}