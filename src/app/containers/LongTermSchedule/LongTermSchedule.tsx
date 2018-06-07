import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { allShifts } from '../../modules/shifts/selectors';
import { allLeaves } from '../../modules/leaves/selectors';
import {
    getShifts,
    unlinkShift,
    linkShift,
} from '../../modules/shifts/actions';
import { getLeaves } from '../../modules/leaves/actions';
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
import {
    visibleTime,
    selectedShiftIds
} from '../../modules/schedule/selectors';
import {
    selectShift as selectShiftAction,
    unselectShift as unselectShiftAction
} from '../../modules/schedule/actions';
import { sheriffLoanMap } from '../../modules/sheriffs/selectors';
import { MapType } from '../../api/Api';

interface LongTermScheduleProps extends Partial<ShiftScheduleProps> {
    sideBarWidth?: number;
    allowTimeDrag?: boolean;
}

interface LongTermScheduleDispatchProps {
    fetchShifts: () => void;
    assignShift: (link: { sheriffId: IdType, shiftId: IdType }) => void;
    unassignShift: (link: { sheriffId: IdType, shiftId: IdType }) => void;
    fetchLeaves: () => void;
    selectShift: (shiftId: IdType) => void;
    unselectShift: (shiftId: IdType) => void;
}

interface LongTermScheduleStateProps {
    shifts: Shift[];
    leaves: Leave[];
    visibleTimeStart: any;
    visibleTimeEnd: any;
    selectedShifts: IdType[];
    loanMap?: MapType<{ isLoanedIn: boolean, isLoanedOut: boolean }>;
}

class LongTermSchedule extends React.Component<LongTermScheduleProps
    & LongTermScheduleStateProps
    & LongTermScheduleDispatchProps> {

    componentWillMount() {
        const {
            fetchShifts,
            fetchLeaves
        } = this.props;

        fetchShifts();
        fetchLeaves();
    }

    isSheriffOnLeave(sheriffId: IdType, shift: Shift): boolean {
        const { leaves } = this.props;
        let leavesForSheriff = leaves.filter(l => l.sheriffId === sheriffId);
        let dateFilteredLeaves = leavesForSheriff.filter(l =>
            moment(l.startDate).isBetween(shift.startDateTime, shift.endDateTime, 'days', '[]'));
        return dateFilteredLeaves.length > 0;
    }

    isSheriffScheduledForDay(sheriffId: IdType, shiftStart: DateType): boolean {
        const { shifts } = this.props;
        let shiftsForSheriff = shifts.filter(s => s.sheriffId === sheriffId);
        let dateFilteredShifts = shiftsForSheriff.filter(s =>
            moment(s.startDateTime).isSame(shiftStart, 'day'));

        return dateFilteredShifts.length > 0;
    }

    isSheriffLoanedOut(sheriffId: IdType): boolean {
        const { loanMap = {} } = this.props;
        return loanMap[sheriffId].isLoanedOut;
    }

    private isShiftSelected(shiftId: IdType): boolean {
        const { selectedShifts = [] } = this.props;
        return selectedShifts.indexOf(shiftId) >= 0;
    }

    private toggleShiftSelect(shiftId: IdType) {
        const { selectShift, unselectShift } = this.props;
        if (this.isShiftSelected(shiftId)) {
            unselectShift(shiftId);
        } else {
            selectShift(shiftId);
        }
    }

    render() {
        const {
            shifts = [],
            assignShift,
            visibleTimeStart,
            visibleTimeEnd,
        } = this.props;

        return (
            <div className="scheduling-timeline">
                <ShiftSchedule
                    shifts={shifts}
                    visibleTimeEnd={visibleTimeEnd}
                    visibleTimeStart={visibleTimeStart}
                    itemRenderer={(shift) => (
                        <SheriffDropTarget
                            style={{
                                height: '100%',
                                display: 'flex'
                            }}
                            onDropItem={(sheriff) => assignShift({ sheriffId: sheriff.id, shiftId: shift.id })}
                            canDropItem={(sheriff) =>
                                !this.isSheriffLoanedOut(sheriff.id)
                                && !this.isSheriffOnLeave(sheriff.id, shift)
                                && !this.isSheriffScheduledForDay(sheriff.id, moment(shift.startDateTime))
                            }
                            className="shift-card drop-shadow-hover"
                            onClick={() => this.toggleShiftSelect(shift.id)}
                        >
                            <ShiftCard
                                shift={shift}
                                isSelected={this.isShiftSelected(shift.id)}
                                isAssigned={shift.sheriffId != undefined}
                            >
                                <SheriffDisplay sheriffId={shift.sheriffId} />
                                <div style={{ paddingBottom: 5 }}>{shift.title}</div>
                            </ShiftCard>
                        </SheriffDropTarget>
                    )}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: RootState, props: LongTermScheduleProps) => {
    const currentVisibleTime = visibleTime(state);
    return {
        shifts: allShifts(state),
        leaves: allLeaves(state),
        ...currentVisibleTime,
        selectedShifts: selectedShiftIds(state),
        loanMap: sheriffLoanMap(state)
    };
};

const mapDispatchToProps = {
    fetchShifts: getShifts,
    assignShift: linkShift,
    unassignShift: unlinkShift,
    fetchLeaves: getLeaves,
    selectShift: selectShiftAction,
    unselectShift: unselectShiftAction
};

export default connect<LongTermScheduleStateProps, LongTermScheduleDispatchProps, LongTermScheduleProps>(
    mapStateToProps, mapDispatchToProps)(LongTermSchedule);