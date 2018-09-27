import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { getSheriffShifts } from '../modules/shifts/selectors';
import { getShifts } from '../modules/shifts/actions';
import {
    Shift,
    Sheriff,
    TimeType,
    WorkSectionCode,
    IdType,
    Leave
} from '../api';
import SheriffListCard from '../components/SheriffListCard/SheriffListCard';
import { visibleTime } from '../modules/dutyRoster/selectors';
import WorkSectionIndicator from '../components/WorkSectionIndicator/WorkSectionIndicator';
import { isSheriffLoanedIn, isSheriffLoanedOut } from '../modules/sheriffs/selectors';
import { currentLocation as currentSystemLocation } from '../modules/user/selectors';
import LocationDisplay from './LocationDisplay';
import { getLeaves } from '../modules/leaves/actions';
import { getActiveSheriffFullDayLeaves, getActiveSheriffPartialLeaves } from '../modules/leaves/selectors';
import PartialLeavePopover from '../components/PartialLeavePopover';
import SheriffLoanIcon from './SheriffLoanIcon';

interface ConnectedDutyRosterSheriffCardProps {
    sheriff: Sheriff;
}

interface ConnectedDutyRosterSheriffCardDispatchProps {
    fetchShifts: () => void;
    fetchLeaves: () => void;
}

interface ConnectedDutyRosterSheriffCardStateProps {
    shifts: Shift[];
    visibleTimeStart: any;
    currentLocationId?: IdType;
    fullDayLeaves?: Leave[];
    partialDayLeaves?: Leave[];
    isLoanedOut: boolean;
    isLoanedIn: boolean;
}

class ConnectedDutyRosterSheriffCard extends React.Component<ConnectedDutyRosterSheriffCardProps
    & ConnectedDutyRosterSheriffCardStateProps
    & ConnectedDutyRosterSheriffCardDispatchProps> {

    getShiftDisplayForDate(date: TimeType): { shiftTime: string, workSectionId?: WorkSectionCode } {
        const { shifts, currentLocationId } = this.props;
        const shiftsForDay =
            shifts.filter(s => s.locationId == currentLocationId)
                .filter(s => moment(date).isSame(s.startDateTime, 'day'));
        if (shiftsForDay.length > 1) {
            return {
                shiftTime: 'Multiple Shifts'
            };
        } else if (shiftsForDay.length === 1) {
            const { startDateTime, endDateTime, workSectionId } = shiftsForDay[0];
            return {
                shiftTime: `${moment(startDateTime).format('HH:mm')} 
                    - ${moment(endDateTime).format('HH:mm')}`,
                workSectionId: workSectionId
            };
        }
        return { shiftTime: '', workSectionId: undefined };
    }

    fullDayLeaveForVisibleDay(): Leave | undefined {
        const { fullDayLeaves = [], visibleTimeStart } = this.props;
        const leavesForVisibleDay =
            fullDayLeaves.filter(l => moment(visibleTimeStart).isBetween(l.startDate, l.endDate, 'days', '[]'));
        return leavesForVisibleDay.length > 0 ? leavesForVisibleDay[0] : undefined;
    }

    partialLeaveForVisibleDay(): Leave | undefined {
        const { partialDayLeaves = [], visibleTimeStart } = this.props;
        const leavesForVisibleDay =
            partialDayLeaves.filter(l => moment(l.startDate).isSame(visibleTimeStart, 'days'));
        return leavesForVisibleDay.length > 0 ? leavesForVisibleDay[0] : undefined;
    }

    render() {
        const {
            visibleTimeStart,
            sheriff,
            sheriff: { id, currentLocationId },
            isLoanedOut = false,
            isLoanedIn = false
        } = this.props;
        const { shiftTime, workSectionId } = this.getShiftDisplayForDate(moment(visibleTimeStart).toISOString());
        const hasShift = shiftTime !== '';
        const fullDayLeave = this.fullDayLeaveForVisibleDay();
        const isOnLeaveForDay = fullDayLeave !== undefined;
        const partialDayLeave = this.partialLeaveForVisibleDay();
        const isOnLeaveForPartialDay = partialDayLeave !== undefined;
        const showScheduleDeatils = isLoanedIn || isLoanedOut || hasShift || isOnLeaveForDay || isOnLeaveForPartialDay;
        return (
            <SheriffListCard sheriff={sheriff} disabled={!hasShift} >
                <div
                    style={{
                        fontSize: 14,
                        fontWeight: 'bold'
                    }}
                >
                    {showScheduleDeatils && <div style={{ marginTop: 8 }}>
                        <SheriffLoanIcon sheriffId={id} />
                        <span style={{ marginLeft: 8, position: 'relative', bottom: 8 }}>
                            {isOnLeaveForPartialDay &&
                                <span style={{ marginRight: 5 }}><PartialLeavePopover leave={partialDayLeave} /></span>}
                            {!isLoanedOut && shiftTime}
                            {isLoanedOut && <LocationDisplay id={currentLocationId} />}
                            {isOnLeaveForDay && fullDayLeave &&
                                <span>
                                    {`On ${Leave.getLeaveTypeDisplay(fullDayLeave)}`}
                                </span>}
                        </span>
                    </div>}

                    {hasShift &&
                        <WorkSectionIndicator workSectionId={workSectionId} orientation={'bottom-right'} />}
                </div>
            </SheriffListCard>
        );
    }

}

const mapStateToProps = (state: RootState, { sheriff }: ConnectedDutyRosterSheriffCardProps) => {
    return {
        shifts: getSheriffShifts(sheriff.id)(state),
        visibleTimeStart: visibleTime(state).visibleTimeStart,
        isLoanedIn: isSheriffLoanedIn(sheriff.id)(state),
        isLoanedOut: isSheriffLoanedOut(sheriff.id)(state),
        currentLocationId: currentSystemLocation(state),
        fullDayLeaves: getActiveSheriffFullDayLeaves(sheriff.id)(state),
        partialDayLeaves: getActiveSheriffPartialLeaves(sheriff.id)(state)
    };
};

const mapDispatchToProps = {
    fetchShifts: getShifts,
    fetchLeaves: getLeaves
};

// tslint:disable-next-line:max-line-length
export default connect<ConnectedDutyRosterSheriffCardStateProps, ConnectedDutyRosterSheriffCardDispatchProps, ConnectedDutyRosterSheriffCardProps>(
    mapStateToProps, mapDispatchToProps)(ConnectedDutyRosterSheriffCard);