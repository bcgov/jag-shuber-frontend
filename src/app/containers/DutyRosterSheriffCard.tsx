import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { getSheriffShifts } from '../modules/shifts/selectors';
import { getShifts } from '../modules/shifts/actions';
import {
    Shift,
    Sheriff,
    TimeType,
    WorkSectionCode
} from '../api';
import SheriffListCard from '../components/SheriffListCard/SheriffListCard';
import { visibleTime } from '../modules/timeline/selectors';
import WorkSectionIndicator from '../components/WorkSectionIndicator/WorkSectionIndicator';

interface ConnectedDutyRosterSheriffCardProps {
    sheriff: Sheriff;
}

interface ConnectedDutyRosterSheriffCardDispatchProps {
    fetchShifts: () => void;
}

interface ConnectedDutyRosterSheriffCardStateProps {
    shifts: Shift[];
    visibleTimeStart: any;
}

class ConnectedDutyRosterSheriffCard extends React.Component<ConnectedDutyRosterSheriffCardProps
    & ConnectedDutyRosterSheriffCardStateProps
    & ConnectedDutyRosterSheriffCardDispatchProps> {

    getShiftDisplayForDate(date: TimeType): { shiftTime: string, workSectionId?: WorkSectionCode } {
        const { shifts } = this.props;
        const shiftsForDay = shifts.filter(s => moment(date).isSame(s.startDateTime, 'day'));
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

    render() {
        const { visibleTimeStart, sheriff } = this.props;
        const {shiftTime, workSectionId} = this.getShiftDisplayForDate(moment(visibleTimeStart).toISOString());
        const isCardDisabled = shiftTime === '';
        
        return (
            <SheriffListCard sheriff={sheriff} disabled={isCardDisabled} >
                {!isCardDisabled &&
                    <div
                        style={{
                            fontSize: 14,
                            fontWeight: 'bold'
                        }}
                    >
                        {shiftTime}
                        <WorkSectionIndicator workSectionId={workSectionId} orientation={'bottom-right'}/>
                        
                    </div>}
            </SheriffListCard>
        );
    }

}

const mapStateToProps = (state: RootState, { sheriff }: ConnectedDutyRosterSheriffCardProps) => {
    return {
        shifts: getSheriffShifts(sheriff.id)(state),
        visibleTimeStart: visibleTime(state).visibleTimeStart
    };
};

const mapDispatchToProps = {
    fetchShifts: getShifts,
};

// tslint:disable-next-line:max-line-length
export default connect<ConnectedDutyRosterSheriffCardStateProps, ConnectedDutyRosterSheriffCardDispatchProps, ConnectedDutyRosterSheriffCardProps>(
    mapStateToProps, mapDispatchToProps)(ConnectedDutyRosterSheriffCard);