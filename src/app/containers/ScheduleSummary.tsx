import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { doTimeRangesOverlap } from 'jag-shuber-api';

import {
    MapType,
    IdType,
    DateType,
    TimeType,
    Leave,
    Shift,
    SheriffLocation
} from '../api';

import { RootState } from '../store';

import {
    getSheriffShifts
} from '../modules/shifts/selectors';

import {
    visibleTime
} from '../modules/schedule/selectors';

import {
    getActiveSheriffFullDayLeaves,
    getActiveSheriffPartialLeaves
} from '../modules/leaves/selectors';

import {
    sheriffLoanMap as sheriffLoanMapSelector
} from '../modules/sheriffs/selectors';

import {
    getSheriffFullDayLocations,
    getSheriffPartialDayLocations
} from '../modules/sheriffLocations/selectors';

import { getShifts } from '../modules/shifts/actions';
import { getLeaves } from '../modules/leaves/actions';

import {
    default as ScheduleSummary,
    StatusEnum
} from '../components/ScheduleSummary/ScheduleSummary';
import PartialLeavePopover from '../components/PartialLeavePopover';
import AlertIcon from '../components/Icons/Alert';
import { Handle } from 'rc-slider';

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
    sheriffLoanMap?: MapType<{ isLoanedIn: boolean, isLoanedOut: boolean }>;
    fullDayLoans: SheriffLocation[];
    partialDayLoans: SheriffLocation[];
    fullDayLeaves: Leave[];
    partialDayLeaves: Leave[];
    shifts: Shift[];
}

interface HandleDayParams {
    dayOfTheWeekMoment: moment.Moment;
    visibleTimeStart: TimeType;
    visibleTimeEnd: TimeType;
    currentLoan?: any;
    fullDayLoans?: SheriffLocation[];
    partialDayLoans?: SheriffLocation[];
    fullDayLeaves?: Leave[];
    partialDayLeaves?: Leave[];
    shifts?: Shift[];
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

    getDayMoment(day: string, visibleTimeStart: any) {
        let dayMoment = undefined;
        switch (day) {
            case 'monday':
                dayMoment = moment(visibleTimeStart).utc().startOf('day');
                break;
            case 'tuesday':
                dayMoment = moment(visibleTimeStart).utc().startOf('day').add(1, 'day');
                break;
            case 'wednesday':
                dayMoment = moment(visibleTimeStart).utc().startOf('day').add(2, 'day');
                break;
            case 'thursday':
                dayMoment = moment(visibleTimeStart).utc().startOf('day').add(3, 'day');
                break;
            case 'friday':
                dayMoment = moment(visibleTimeStart).utc().startOf('day').add(4, 'day');
                break;
            case 'saturday':
                dayMoment = moment(visibleTimeStart).utc().startOf('day').add(5, 'day');
                break;
            case 'sunday':
                dayMoment = moment(visibleTimeStart).utc().startOf('day').add(6, 'day');
                break;
            default:
                dayMoment = '';
        }

        return dayMoment;
    }

    isOnDate(date: moment.Moment, dateTimeStart: any, dateTimeEnd: any): boolean {
        const result = date.isBetween(dateTimeStart, dateTimeEnd, 'days', '[]');
        return result;
    }

    getStatusForDayOfWeek(params: HandleDayParams) {
        const {
            currentLoan,
            dayOfTheWeekMoment,
            visibleTimeStart,
            visibleTimeEnd,
            fullDayLoans = [],
            partialDayLoans = [],
            fullDayLeaves = [],
            partialDayLeaves = [],
            shifts = []
        } = params;

        const { isLoanedIn, isLoanedOut } = currentLoan;

        const onLeave = fullDayLeaves
            .filter(i => {
                const include = doTimeRangesOverlap(
                    { startTime: moment(i.startDate).toISOString(), endTime: moment(i.endDate).toISOString() },
                    { startTime: moment(visibleTimeStart).toISOString(), endTime: moment(visibleTimeEnd).toISOString() })
                    || moment(i.endDate).isSame(moment(visibleTimeStart));

                return include;
            })
            .filter((i) => {
                const include = this.isOnDate(dayOfTheWeekMoment, i.startDate, i.endDate);
                return include;
            });

        const onLoan = fullDayLoans
            .filter(i => {
                const include = doTimeRangesOverlap(
                    { startTime: moment(i.startDate).toISOString(), endTime: moment(i.endDate).toISOString() },
                    { startTime: moment(visibleTimeStart).toISOString(), endTime: moment(visibleTimeEnd).toISOString() })
                || moment(i.endDate).isSame(moment(visibleTimeStart));

                return include;
            })
            .filter((i) => {
                const include = this.isOnDate(dayOfTheWeekMoment, i.startDate, i.endDate);
                return include;
            });

        const onPartialLeave = partialDayLeaves.filter((i) => {
            const include = this.isOnDate(dayOfTheWeekMoment, i.startDate, i.endDate);
            return include;
        });

        const onPartialLoan = partialDayLoans.filter((i) => {
            const include = this.isOnDate(dayOfTheWeekMoment, i.startDate, i.endDate);
            return include;
        });

        const onShift = shifts.filter(i => {
            const include = this.isOnDate(dayOfTheWeekMoment, i.startDateTime, i.endDateTime);
            return include;
        });

        let status;

        // Handle full days first
        if (isLoanedIn) {
            status = (onLeave.length > 0 || onLoan.length > 0) ? StatusEnum.EMPTY : StatusEnum.BAD;
            // Next handle partials
            status = (onPartialLeave.length > 0 || onPartialLoan.length > 0) ? StatusEnum.WARNING : status;
            // Finally handle shifts
            status = (onShift.length > 0) ? StatusEnum.GOOD : status;
        } else if (isLoanedOut) {
            status = (onLeave.length > 0 || onLoan.length > 0) ? StatusEnum.BAD : StatusEnum.EMPTY;
            // Next handle partials
            status = (onPartialLeave.length > 0 || onPartialLoan.length > 0) ? StatusEnum.WARNING : status;
            // Finally handle shifts
            status = (onShift.length > 0) ? StatusEnum.GOOD : status;
        } else {
            status = (onLeave.length > 0) ? StatusEnum.BAD : StatusEnum.EMPTY;
            // Next handle partials
            status = (onPartialLeave.length > 0) ? StatusEnum.WARNING : status;
            // Finally handle shifts
            status = (onShift.length > 0) ? StatusEnum.GOOD : status;
        }

        return status;
    }

    createWeekStatus() {
        const {
            sheriffId,
            visibleTimeStart,
            visibleTimeEnd,
            sheriffLoanMap = {},
            fullDayLeaves = [],
            partialDayLeaves = [],
            fullDayLoans = [],
            partialDayLoans = [],
            shifts
        } = this.props;

        const currentLoan = sheriffLoanMap[sheriffId];
        const { isLoanedIn, isLoanedOut } = currentLoan;
        const today = moment().format('dddd').toLowerCase();

        if (fullDayLoans && fullDayLoans.length > 0) {
            console.log('sheriff has full day loans!');
        }

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

        Object.keys(weekStatus).reduce((status: { [key: string]: any }, dayOfWeek: string) => {
            const params: Partial<HandleDayParams> = {
                visibleTimeStart,
                visibleTimeEnd,
                currentLoan,
                fullDayLoans,
                partialDayLoans,
                fullDayLeaves,
                partialDayLeaves,
                shifts
            };

            params.dayOfTheWeekMoment = this.getDayMoment(dayOfWeek, visibleTimeStart) as moment.Moment;
            status[dayOfWeek] = this.getStatusForDayOfWeek(params as HandleDayParams);

            return status;
        }, weekStatus);

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
                                icon={<AlertIcon/>}
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
        sheriffLoanMap: sheriffLoanMapSelector(state),
        shifts: getSheriffShifts(sheriffId)(state),
        fullDayLeaves: getActiveSheriffFullDayLeaves(sheriffId)(state),
        partialDayLeaves: getActiveSheriffPartialLeaves(sheriffId)(state),
        fullDayLoans: getSheriffFullDayLocations(sheriffId)(state),
        partialDayLoans: getSheriffPartialDayLocations(sheriffId)(state)
    };
};

const mapDispatchToProps = {
    fetchShifts: getShifts,
    fetchLeaves: getLeaves
};

// tslint:disable-next-line:max-line-length
export default connect<ConnectedScheduleSummaryStateProps, ConnectedScheduleSummaryDispatchProps, ConnectedScheduleSummaryProps>(
    mapStateToProps, mapDispatchToProps)(ConnectedScheduleSummary);
