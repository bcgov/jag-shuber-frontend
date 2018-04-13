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
    WorkSectionCode
} from '../../api';
import { getWorkSectionColour } from '../../api/utils';

export interface SheriffDutyBarProps {
    sheriffId?: IdType;
    sheriffDuty: SheriffDuty;
    duty: AssignmentDuty;
    dutyWorkSection?: WorkSectionCode;
    title?: string;
    isExtra?: boolean;
    showBorder?: boolean;
    onRemove?: () => void;
}

export default class SheriffDutyBar extends React.PureComponent<SheriffDutyBarProps>{
    getDutyBarWidth() {
        const {
            sheriffDuty: { startDateTime: sheriffDutyStart, endDateTime: sheriffDutyEnd },
            duty: { startDateTime: dutyStart, endDateTime: dutyEnd }
        } = this.props;
        const dutyDuration: number = moment.duration(moment(dutyEnd).diff(dutyStart)).asMinutes();
        const sheriffDutyDuration: number = moment.duration(moment(sheriffDutyEnd).diff(sheriffDutyStart)).asMinutes();
        const sheriffDutyPercentage = (sheriffDutyDuration / dutyDuration) * 100;

        return `${sheriffDutyPercentage.toString()}%`;
    }

    getDutyBarLeftPosition() {
        const {
            sheriffDuty: { startDateTime: sheriffDutyStart },
            duty: { startDateTime: dutyStart, endDateTime: dutyEnd }
        } = this.props;
        const dutyDuration: number = moment.duration(moment(dutyEnd).diff(dutyStart)).asMinutes();
        const differenceBetweenStarts: number = moment.duration(moment(sheriffDutyStart).diff(dutyStart)).asMinutes();
        const startDifferencePercentage = (differenceBetweenStarts / dutyDuration) * 100;

        return `${startDifferencePercentage.toString()}%`;
    }

    getDutyBarHeight() {
        const { duty: { sheriffDuties } } = this.props;
        if (sheriffDuties.length > 0) {
            const dutyBarPercentage = (1 / sheriffDuties.length) * 100;
            return `${dutyBarPercentage.toString()}%`;
        }
        return '100%';
        
    }
    
    getDutyBarTopPosition () {
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

    render() {
        const {
            sheriffId,
            showBorder = true,
            onRemove,
            dutyWorkSection = 'OTHER'
        } = this.props;
        const isAssigned = sheriffId !== undefined && sheriffId !== '';
        const title = !this.props.title ? (isAssigned ? `Sheriff #${sheriffId}` : '') : this.props.title.toUpperCase();

        return (
            <div
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
                    <div style={{ margin: 'auto', fontSize: 16 }}>
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
            </div>
        )
    }
}