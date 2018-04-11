import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { getSheriffShifts } from '../modules/shifts/selectors';
import { getShifts } from '../modules/shifts/actions';
import {
    Shift,
    Sheriff,
    DateType
} from '../api';
import SheriffListCard from '../components/SheriffListCard/SheriffListCard';

interface ConnectedDutyRosterSheriffCardProps {
    sheriff: Sheriff;
    date: DateType;
}

interface ConnectedDutyRosterSheriffCardDispatchProps {
    fetchShifts: () => void;
}

interface ConnectedDutyRosterSheriffCardStateProps {
    shifts: Shift[];
}

class ConnectedDutyRosterSheriffCard extends React.Component<ConnectedDutyRosterSheriffCardProps
    & ConnectedDutyRosterSheriffCardStateProps
    & ConnectedDutyRosterSheriffCardDispatchProps> {
        
    getShiftDisplayForDate(date: DateType): string {
        const { shifts } = this.props;
        const shiftsForDay = shifts.filter(s => moment(date).isSame(s.startDateTime, 'day'));
        if (shiftsForDay.length > 0) {
            return `${moment(shiftsForDay[0].startDateTime).format('HH:mm')} 
                    - ${moment(shiftsForDay[0].endDateTime).format('HH:mm')}`;
        } 
        return '';
    }

    render() {
        const { date, sheriff } = this.props;
        const shiftSummary = this.getShiftDisplayForDate(date);
        const isCardDisabled = shiftSummary === '';
        return (
            <SheriffListCard sheriff={sheriff} disabled={isCardDisabled} >
                <div style={{fontSize: 14}}>{shiftSummary}</div>
            </SheriffListCard> 
        );
    }

}

const mapStateToProps = (state: RootState, { sheriff }: ConnectedDutyRosterSheriffCardProps) => {
    return {
        shifts: getSheriffShifts(sheriff.id)(state),
    };
};

const mapDispatchToProps = {
    fetchShifts: getShifts,
};

// tslint:disable-next-line:max-line-length
export default connect<ConnectedDutyRosterSheriffCardStateProps, ConnectedDutyRosterSheriffCardDispatchProps, ConnectedDutyRosterSheriffCardProps>(
    mapStateToProps, mapDispatchToProps)(ConnectedDutyRosterSheriffCard);