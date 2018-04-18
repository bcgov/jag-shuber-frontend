import * as React from 'react';
import * as moment from 'moment';
import {
    Glyphicon,
    Label
} from 'react-bootstrap';
import './SheriffDutyBar.css';
import {
    IdType,
    SheriffDuty,
    AssignmentDuty,
    WorkSectionCode,
    Sheriff
} from '../../api';
import { getWorkSectionColour } from '../../api/utils';
import SheriffDropTarget from '../../containers/SheriffDropTarget';
import * as TimeRangeUtils from '../../infrastructure/TimeRangeUtils'; 

export interface SheriffDutyBarProps {
    sheriffId?: IdType;
    sheriffDuty: SheriffDuty;
    duty: AssignmentDuty;
    dutyWorkSection?: WorkSectionCode;
    title?: string;
    isExtra?: boolean;
    showBorder?: boolean;
    onRemove?: () => void;
    canDropSheriff?: (sheriff: Sheriff) => boolean;
    onDropSheriff?: (sheriff: Sheriff, sheriffDuty: SheriffDuty) => void;
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
    
    private getDutyBarTopPosition () {
        const {
            sheriffDuty,
            duty: {sheriffDuties}
        } = this.props;
        if (sheriffDuties.length > 0) {
            const index = sheriffDuties.findIndex(s => s.id === sheriffDuty.id);
            const heightPercentage = (index / sheriffDuties.length) * 100;
            return `${heightPercentage.toString()}%`;
        }
        return '0%';
    }

    private canAssignSheriff(sheriff: Sheriff): boolean {
        const { duty: {sheriffDuties = []}, sheriffDuty: sheriffDutyToAssign  } = this.props;
        const sdToAssignStartTime = moment(sheriffDutyToAssign.startDateTime).toISOString();
        const sdToAssignEndTime = moment(sheriffDutyToAssign.endDateTime).toISOString();
        
        const anyOverlap: boolean = sheriffDuties.filter(sd => sd.sheriffId === sheriff.id)
        .some(sd => TimeRangeUtils
                    .doTimeRangesOverlap(
                        // tslint:disable-next-line:max-line-length
                        {startTime: moment(sd.startDateTime).toISOString(), endTime: moment(sd.endDateTime).toISOString()}, 
                        {startTime: sdToAssignStartTime, endTime: sdToAssignEndTime}
                    ));
                    
        return !anyOverlap;
    }

    render() {
        const {
            sheriffId,
            sheriffDuty,
            showBorder = true,
            onRemove,
            dutyWorkSection = 'OTHER',
            canDropSheriff = (s: Sheriff) => this.canAssignSheriff(s),
            onDropSheriff,
        } = this.props;
        const isAssigned = sheriffId !== undefined && sheriffId !== '';
        const title = !this.props.title ? (isAssigned ? `Sheriff #${sheriffId}` : '') : this.props.title.toUpperCase();

        return (
            <SheriffDropTarget
                onDropItem={(s) => onDropSheriff && onDropSheriff(s, sheriffDuty)}
                canDropItem={canDropSheriff}
                className="sheriff-duty-bar"
                style={{
                    borderBottomWidth: showBorder ? 1 : 0,
                    width: this.getDutyBarWidth(),
                    position: 'absolute',
                    left: this.getDutyBarLeftPosition(),
                    backgroundColor: getWorkSectionColour(dutyWorkSection),
                    height: this.getDutyBarHeight(),
                    top: this.getDutyBarTopPosition()
                }}
            >
                {isAssigned && (
                    <div style={{ margin: 'auto', fontSize: 15 }}>
                        {title}
                        {onRemove !== undefined && (
                            <Label
                                className="remove-assignment-btn"
                                bsSize="xs"
                                onMouseDown={() => onRemove && onRemove()}
                                bsStyle="danger"
                            >
                                <Glyphicon glyph="remove" />
                            </Label>
                        )}
                    </div>
                )}
            </SheriffDropTarget>
        );
    }
}