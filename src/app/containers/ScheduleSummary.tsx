import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    getSheriffLeaves,
    getSheriffShifts
} from '../modules/shifts/selectors';
import {
    getLeaves,
    getShifts
} from '../modules/shifts/actions';
import {
    visibleTime
} from '../modules/schedule/selectors';
import {
    default as ScheduleSummary,
    StatusEnum
} from '../components/ScheduleSummary/ScheduleSummary';
import {
    Leave,
    Shift,
    IdType,
    TimeType
} from '../api';

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
    leaves: Leave[];
    shifts: Shift[];
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
    
    createWeekStatus() {
        const { 
            leaves, 
            shifts, 
            visibleTimeStart, 
            visibleTimeEnd,
        } = this.props;

        const leavesForWeek = leaves
            .filter(l => moment(l.date).isBetween(visibleTimeStart, visibleTimeEnd, 'days', '[]'));
        const shiftsForWeek = shifts
            .filter(s => moment(s.startDateTime).isBetween(visibleTimeStart, visibleTimeEnd, 'days', '[]'));
        
        let weekStatus = {
            monday: StatusEnum.EMPTY,
            tuesday: StatusEnum.EMPTY,
            wednesday: StatusEnum.EMPTY,
            thursday: StatusEnum.EMPTY,
            friday: StatusEnum.EMPTY,
        };
        
        leavesForWeek.forEach(leave => {
            let day = this.getDay(moment(leave.date));
            weekStatus[day] = StatusEnum.BAD;
        });

        shiftsForWeek.forEach(shift => {
            let day = this.getDay(moment(shift.startDateTime));
            weekStatus[day] = StatusEnum.GOOD;
        });
       
        return weekStatus;
    }

    render() {

        return (
            <ScheduleSummary weekStatus={this.createWeekStatus()} />
        );
    }

}

const mapStateToProps = (state: RootState, { sheriffId }: ConnectedScheduleSummaryProps) => {
    const currentVisibleTime = visibleTime(state);
    return {
        ...currentVisibleTime,
        shifts: getSheriffShifts(sheriffId)(state),
        leaves: getSheriffLeaves(sheriffId)(state)
    };
};

const mapDispatchToProps = {
    fetchShifts: getShifts,
    fetchLeaves: getLeaves
};

// tslint:disable-next-line:max-line-length
export default connect<ConnectedScheduleSummaryStateProps, ConnectedScheduleSummaryDispatchProps, ConnectedScheduleSummaryProps>(
    mapStateToProps, mapDispatchToProps)(ConnectedScheduleSummary);