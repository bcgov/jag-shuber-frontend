import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { allShifts } from '../../modules/shifts/selectors';
import { getShifts } from '../../modules/shifts/actions';
import {
    default as ShiftSchedule,
    ShiftScheduleProps
} from '../../components/ShiftSchedule';
import {
    Shift
} from '../../api';
import './LongTermSchedule.css';

interface LongTermScheduleProps extends Partial<ShiftScheduleProps> {
    sideBarWidth?: number;
    allowTimeDrag?: boolean;
}

interface LongTermScheduleDispatchProps {
    fetchShifts: () => void;
}

interface LongTermScheduleStateProps {
    shifts: Shift[];
}

class LongTermSchedule extends React.Component<LongTermScheduleProps
                                                & LongTermScheduleStateProps
                                                & LongTermScheduleDispatchProps> {
    componentWillMount() {
        const { fetchShifts } = this.props;
        fetchShifts();
    }

    render() {
        const {
            shifts = []
        } = this.props;

        const newVisibleTimeStart = moment().startOf('week');
        const newVisibleTimeEnd = moment().endOf('week');

        return (
            <div className="scheduling-timeline">
                <ShiftSchedule
                    shifts={shifts}
                    visibleTimeEnd={newVisibleTimeEnd}
                    visibleTimeStart={newVisibleTimeStart}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: RootState, props: LongTermScheduleProps) => {
    return {
        shifts: allShifts(state)
    };
}

const mapDispatchToProps = {
    fetchShifts: getShifts
};

export default connect<LongTermScheduleStateProps, LongTermScheduleDispatchProps, LongTermScheduleProps>(
    mapStateToProps, mapDispatchToProps)(LongTermSchedule);