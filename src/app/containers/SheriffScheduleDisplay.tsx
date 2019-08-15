import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    allShifts
} from '../modules/shifts/selectors';
import {
    getShifts
} from '../modules/shifts/actions';
import { getSheriffList } from '../modules/sheriffs/actions';
import { 
    sheriffs, 
    sheriffLoanMap
} from '../modules/sheriffs/selectors';
import {
    Shift,
    TimeType,
    Sheriff,
    MapType
} from '../api/Api';
import ScheduleDeputyViewList from '../components/ScheduleDeputyViewList';
import { 
    publishViewVisibleWeek,
    isShowWorkSections 
} from '../modules/schedule/selectors';

interface SheriffScheduleDisplayProps {
}

interface SheriffScheduleDisplayDispatchProps {
    fetchShifts: () => void;
    fetchSheriffs: () => void;
}

interface SheriffScheduleDisplayStateProps {
    shifts: Shift[];
    sheriffs: Sheriff[];
    weekStart?: TimeType;
    includeWorkSection?: boolean;  
    sheriffLoanMap?: MapType<{isLoanedIn: boolean, isLoanedOut: boolean}>;
}

class SheriffScheduleDisplay extends React.Component<SheriffScheduleDisplayProps
    & SheriffScheduleDisplayStateProps
    & SheriffScheduleDisplayDispatchProps> {

    getShiftsForWeek(): Shift[] {
        const { shifts, weekStart = moment().startOf('week').toISOString() } = this.props;
        const shiftsForWeek = shifts
            .filter(s => 
                moment(s.startDateTime)
                    .isBetween(moment(weekStart), moment(weekStart).endOf('week'), 'days', '[]')
            )
            // tslint:disable-next-line:triple-equals
            .filter(weekShift => weekShift.sheriffId != undefined);

        return shiftsForWeek;
    }

    render() {
        const {
            includeWorkSection, 
            sheriffs: sheriffList, 
            weekStart,
            sheriffLoanMap: loanMap = {}
        } = this.props;
        return (
            <ScheduleDeputyViewList
                includeWorkSection={includeWorkSection}
                sheriffs={sheriffList}
                shifts={this.getShiftsForWeek()}
                weekStart={weekStart}
                sheriffLoanMap={loanMap}
            />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    const sheriffsData = sheriffs(state);
    return {
        shifts: allShifts(state),
        sheriffs: sheriffsData,
        weekStart: publishViewVisibleWeek(state),
        includeWorkSection: isShowWorkSections(state),
        sheriffLoanMap: sheriffLoanMap(state)
    };
};

const mapDispatchToProps = {
    fetchShifts: getShifts,
    fetchSheriffs: getSheriffList
};

// tslint:disable-next-line:max-line-length
export default connect<SheriffScheduleDisplayStateProps, SheriffScheduleDisplayDispatchProps, SheriffScheduleDisplayProps>(
    mapStateToProps, mapDispatchToProps)(SheriffScheduleDisplay);