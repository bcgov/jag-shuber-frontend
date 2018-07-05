import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { getSheriffShifts } from '../modules/shifts/selectors';
import { getSheriffFullDayLeaves, getSheriffPartialLeaves } from '../modules/leaves/selectors';
import { getShifts } from '../modules/shifts/actions';
import { getLeaves } from '../modules/leaves/actions';
import {
    visibleTime
} from '../modules/schedule/selectors';
import {
    default as ScheduleSummary,
    StatusEnum
} from '../components/ScheduleSummary/ScheduleSummary';
import { sheriffLoanMap as sheriffLoanMapSelector } from '../modules/sheriffs/selectors';
import {
    Leave,
    Shift,
    IdType,
    TimeType
} from '../api';
import { MapType } from '../api/Api';
import { doTimeRangesOverlap } from '../infrastructure/TimeRangeUtils';
import PartialLeavePopover from '../components/PartialLeavePopover';
// import AlertIcon from '../components/Icons/Alert';
import { Glyphicon } from 'react-bootstrap';

interface ConnectedScheduleSummaryProps {
    sheriffId: IdType;
    visibleTimeStart?: TimeType;
    visibleTimeEnd?: TimeType;
}

interface ConnectedScheduleSummaryDispatchProps {
    fetchShifts: () => void;
    fetchLeaves: () => void;
}

interface ConnectedScheduleSummaryStateProps {
    fullDayLeaves: Leave[];
    partialDayLeaves: Leave[];
    shifts: Shift[];
    sheriffLoanMap?: MapType<{ isLoanedIn: boolean, isLoanedOut: boolean }>;
}

class ConnectedScheduleSummary extends React.Component<ConnectedScheduleSummaryProps
    & ConnectedScheduleSummaryStateProps
    & ConnectedScheduleSummaryDispatchProps> {

    getDay(date: moment.Moment): string {
        switch (date.isoWeekday()) {
            case 1:
                return 'monday';
            case 2:
                return 'tuesday';
            case 3:
                return 'wednesday';
            case 4:
                return 'thursday';
            case 5:
                return 'friday';
            case 6:
                return 'saturday';
            case 7:
                return 'sunday';
            default:
                return '';
        }
    }

    isDayDuringLeave(day: moment.Moment, leave: Leave): boolean {
        return moment(day).isBetween(leave.startDate, leave.endDate, 'days', '[]');
    }

    createWeekStatus() {
        const {
            fullDayLeaves = [],
            shifts,
            visibleTimeStart,
            visibleTimeEnd,
            sheriffLoanMap = {},
            sheriffId,
            partialDayLeaves = []
        } = this.props;

        const { isLoanedIn, isLoanedOut } = sheriffLoanMap[sheriffId];
        const today = moment().format('dddd').toLowerCase();
        const fullDayLeavesForWeek = fullDayLeaves
            .filter(l => doTimeRangesOverlap(
                { startTime: moment(l.startDate).toISOString(), endTime: moment(l.endDate).toISOString() },
                { startTime: moment(visibleTimeStart).toISOString(), endTime: moment(visibleTimeEnd).toISOString() })
            );
        const partialDayLeavesForWeek = partialDayLeaves
            .filter(l => moment(l.startDate).isBetween(visibleTimeStart, visibleTimeEnd, 'days', '[]'));
        const shiftsForWeek = shifts
            .filter(s => moment(s.startDateTime).isBetween(visibleTimeStart, visibleTimeEnd, 'days', '[]'));

        let weekStatus = {
            monday: StatusEnum.EMPTY,
            tuesday: StatusEnum.EMPTY,
            wednesday: StatusEnum.EMPTY,
            thursday: StatusEnum.EMPTY,
            friday: StatusEnum.EMPTY,
        };

        if (isLoanedIn) {
            weekStatus[today] = StatusEnum.LOANED_IN;
        }

        fullDayLeavesForWeek.forEach(leave => {
            weekStatus.monday =
                this.isDayDuringLeave(moment(visibleTimeStart), leave)
                    ? StatusEnum.BAD : StatusEnum.EMPTY;
            weekStatus.tuesday =
                this.isDayDuringLeave(moment(visibleTimeStart).add(1, 'day'), leave)
                    ? StatusEnum.BAD : StatusEnum.EMPTY;
            weekStatus.wednesday =
                this.isDayDuringLeave(moment(visibleTimeStart).add(2, 'day'), leave)
                    ? StatusEnum.BAD : StatusEnum.EMPTY;
            weekStatus.thursday =
                this.isDayDuringLeave(moment(visibleTimeStart).add(3, 'day'), leave)
                    ? StatusEnum.BAD : StatusEnum.EMPTY;
            weekStatus.friday =
                this.isDayDuringLeave(moment(visibleTimeStart).add(4, 'day'), leave)
                    ? StatusEnum.BAD : StatusEnum.EMPTY;
        });

        partialDayLeavesForWeek.forEach(leave => {
            let day = this.getDay(moment(leave.startDate));
            weekStatus[day] = StatusEnum.WARNING;
        });

        shiftsForWeek.forEach(shift => {
            let day = this.getDay(moment(shift.startDateTime));
            weekStatus[day] = StatusEnum.GOOD;
        });

        if (isLoanedOut) {
            weekStatus[today] = StatusEnum.LOANED_OUT;
        }

        return weekStatus;
    }

    render() {
        const { partialDayLeaves, visibleTimeEnd, visibleTimeStart } = this.props;
        const partialDayLeavesForWeek = partialDayLeaves
            .filter(l => moment(l.startDate).isBetween(visibleTimeStart, visibleTimeEnd, 'days', '[]'));

        return (
            <ScheduleSummary
                weekStatus={this.createWeekStatus()}
                StatusRenderComponent={(props) => {
                    const { day, status } = props;
                    if (status === StatusEnum.WARNING) {
                        return (
                            <PartialLeavePopover
                                leave={partialDayLeavesForWeek.find(l => this.getDay(moment(l.startDate)) === day)}
                                placement={'right'}
                                icon={<Glyphicon
                                    className="circle-icon"
                                    glyph="alert"
                                    style={{
                                        borderColor: 'darkorange',
                                        color: 'darkorange',
                                        backgroundColor: 'white',
                                        paddingTop: 2,
                                        top: 0
                                    }}
                                />}
                            />
                        );
                    }
                    return (<ScheduleSummary.DefaultRenderer {...props} />);
                }}
            />
        );
    }

}

const mapStateToProps = (state: RootState, { sheriffId }: ConnectedScheduleSummaryProps) => {
    const currentVisibleTime = visibleTime(state);
    return {
        ...currentVisibleTime,
        shifts: getSheriffShifts(sheriffId)(state),
        fullDayLeaves: getSheriffFullDayLeaves(sheriffId)(state),
        partialDayLeaves: getSheriffPartialLeaves(sheriffId)(state),
        sheriffLoanMap: sheriffLoanMapSelector(state)
    };
};

const mapDispatchToProps = {
    fetchShifts: getShifts,
    fetchLeaves: getLeaves
};

// tslint:disable-next-line:max-line-length
export default connect<ConnectedScheduleSummaryStateProps, ConnectedScheduleSummaryDispatchProps, ConnectedScheduleSummaryProps>(
    mapStateToProps, mapDispatchToProps)(ConnectedScheduleSummary);