import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { allShifts } from '../../modules/shifts/selectors';
import {
    getShifts,
    unlinkShift,
    linkShift
} from '../../modules/shifts/actions';
import {
    default as ShiftSchedule,
    ShiftScheduleProps
} from '../../components/ShiftSchedule';
import {
    Shift, 
    IdType
} from '../../api';
import './LongTermSchedule.css';
import ShiftCard from '../../components/ShiftCard';
import SheriffDropTarget from '../SheriffDropTarget';
import SheriffDisplay from '../SheriffDisplay';

interface LongTermScheduleProps extends Partial<ShiftScheduleProps> {
    sideBarWidth?: number;
    allowTimeDrag?: boolean;
}

interface LongTermScheduleDispatchProps {
    fetchShifts: () => void;
    assignShift: (link: { sheriffId: IdType, shiftId: IdType }) => void;
    unassignShift: (link: { sheriffId: IdType, shiftId: IdType }) => void;
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
            shifts = [],
            assignShift
        } = this.props;

        const newVisibleTimeStart = moment().startOf('isoWeek').valueOf();
        const newVisibleTimeEnd = moment(newVisibleTimeStart).add(5, 'days').valueOf();

        return (
            <div className="scheduling-timeline">
                <ShiftSchedule
                    shifts={shifts}
                    visibleTimeEnd={newVisibleTimeEnd}
                    visibleTimeStart={newVisibleTimeStart}
                    itemRenderer={(shift) => (
                        <SheriffDropTarget
                            style={{
                                height: '100%',
                                display: 'flex'
                            }}
                            onDropItem={(sheriff) => assignShift({ sheriffId: sheriff.badgeNumber, shiftId: shift.id })}
                            canDropItem={(sheriff) => shift.sheriffId === undefined}
                        >
                            <ShiftCard shift={shift}>
                                <SheriffDisplay sheriffId={shift.sheriffId} />
                            </ShiftCard>
                        </SheriffDropTarget>
                    )}
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
    fetchShifts: getShifts,
    assignShift: linkShift,
    unassignShift: unlinkShift
};

export default connect<LongTermScheduleStateProps, LongTermScheduleDispatchProps, LongTermScheduleProps>(
    mapStateToProps, mapDispatchToProps)(LongTermSchedule);