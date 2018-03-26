import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { 
    allShifts,
    allLeaves 
} from '../../modules/shifts/selectors';
import {
    getShifts,
    unlinkShift,
    linkShift,
    getLeaves
} from '../../modules/shifts/actions';
import {
    default as ShiftSchedule,
    ShiftScheduleProps
} from '../../components/ShiftSchedule';
import {
    Shift, 
    IdType,
    Leave,
    DateType
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
    fetchLeaves: () => void;
}

interface LongTermScheduleStateProps {
    shifts: Shift[];
    leaves: Leave[];
}

class LongTermSchedule extends React.Component<LongTermScheduleProps
    & LongTermScheduleStateProps
    & LongTermScheduleDispatchProps> {
    componentWillMount() {
        const { fetchShifts, fetchLeaves } = this.props;
        fetchShifts();
        fetchLeaves();
    }

    isSheriffOnLeave(sheriffId: number, shift: Shift): boolean {
        const { leaves } = this.props;
        let leavesForSheriff = leaves.filter(l => l.sheriffId === sheriffId);
        let dateFilteredLeaves = leavesForSheriff.filter(l => 
            moment(l.date).isBetween(shift.startDateTime, shift.endDateTime, 'days', '[]'));
        return dateFilteredLeaves.length > 0;
    }

    isSheriffScheduledForDay(sheriffId: number, shiftStart: DateType): boolean {
        const { shifts } = this.props;
        let shiftsForSheriff = shifts.filter(s => s.sheriffId === sheriffId);
        let dateFilteredShifts = shiftsForSheriff.filter(s => 
            moment(s.startDateTime).isSame(shiftStart, 'day'));
        
        return dateFilteredShifts.length > 0;
    }

    render() {
        const {
            shifts = [],
            assignShift
        } = this.props;

        const newVisibleTimeStart = moment().startOf('week').valueOf();
        const newVisibleTimeEnd = moment().endOf('week').valueOf();

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
                            onDropItem={(sheriff) => assignShift({ sheriffId: sheriff.id, shiftId: shift.id })}
                            canDropItem={(sheriff) => 
                                shift.sheriffId === undefined 
                                && !this.isSheriffOnLeave(sheriff.id, shift)
                                && !this.isSheriffScheduledForDay(sheriff.id, moment(shift.startDateTime))
                            }
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
        shifts: allShifts(state),
        leaves: allLeaves(state)
    };
}

const mapDispatchToProps = {
    fetchShifts: getShifts,
    assignShift: linkShift,
    unassignShift: unlinkShift,
    fetchLeaves: getLeaves
};

export default connect<LongTermScheduleStateProps, LongTermScheduleDispatchProps, LongTermScheduleProps>(
    mapStateToProps, mapDispatchToProps)(LongTermSchedule);