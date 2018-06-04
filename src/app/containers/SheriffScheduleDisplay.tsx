import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    getSheriffShifts
} from '../modules/shifts/selectors';
import {
    getShifts
} from '../modules/shifts/actions';
import { getSheriffList } from '../modules/sheriffs/actions';
import { sheriffs } from '../modules/sheriffs/selectors';
import {
    Shift,
    TimeType,
    Sheriff
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
        const {includeWorkSection, sheriffs: sheriffList, weekStart} = this.props;
        return (
            <ScheduleDeputyViewList
                includeWorkSection={includeWorkSection}
                sheriffs={sheriffList}
                shifts={this.getShiftsForWeek()}
                weekStart={weekStart}
            />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        shifts: getSheriffShifts()(state),
        sheriffs: sheriffs(state),
        weekStart: publishViewVisibleWeek(state),
        includeWorkSection: isShowWorkSections(state)
    };
};

const mapDispatchToProps = {
    fetchShifts: getShifts,
    fetchSheriffs: getSheriffList
};

// tslint:disable-next-line:max-line-length
export default connect<SheriffScheduleDisplayStateProps, SheriffScheduleDisplayDispatchProps, SheriffScheduleDisplayProps>(
    mapStateToProps, mapDispatchToProps)(SheriffScheduleDisplay);