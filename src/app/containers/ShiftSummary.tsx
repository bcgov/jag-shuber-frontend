import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { getSheriffShifts } from '../modules/shifts/selectors';
import { getShifts } from '../modules/shifts/actions';
import {
    Shift,
    IdType,
    DateType
} from '../api';

interface ConnectedShiftSummaryProps {
    sheriffId: IdType;
    date: DateType;
}

interface ConnectedShiftSummaryDispatchProps {
    fetchShifts: () => void;
}

interface ConnectedShiftSummaryStateProps {
    shifts: Shift[];
}

class ConnectedShiftSummary extends React.Component<ConnectedShiftSummaryProps
    & ConnectedShiftSummaryStateProps
    & ConnectedShiftSummaryDispatchProps> {
        
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
        const { date } = this.props;
        return (
            this.getShiftDisplayForDate(date)
        );
    }

}

const mapStateToProps = (state: RootState, { sheriffId }: ConnectedShiftSummaryProps) => {
    return {
        shifts: getSheriffShifts(sheriffId)(state),
    };
};

const mapDispatchToProps = {
    fetchShifts: getShifts,
};

// tslint:disable-next-line:max-line-length
export default connect<ConnectedShiftSummaryStateProps, ConnectedShiftSummaryDispatchProps, ConnectedShiftSummaryProps>(
    mapStateToProps, mapDispatchToProps)(ConnectedShiftSummary);