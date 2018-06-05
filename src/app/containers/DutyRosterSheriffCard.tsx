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
import { sheriffLoanMap } from '../modules/sheriffs/selectors';
import { currentCourthouse as userCourthouse } from '../modules/user/selectors';
import { MapType, IdType } from '../api/Api';
import CourthouseDisplay from './CourthouseDisplay';
import SheriffLoanOutIcon from '../components/Icons/SheriffLoanOutIcon';
import SheriffLoanInIcon from '../components/Icons/SheriffLoanInIcon';

interface ConnectedDutyRosterSheriffCardProps {
    sheriff: Sheriff;
}

interface ConnectedDutyRosterSheriffCardDispatchProps {
    fetchShifts: () => void;
}

interface ConnectedDutyRosterSheriffCardStateProps {
    shifts: Shift[];
    visibleTimeStart: any;
    sheriffLoanMap?: MapType<{ isLoanedIn: boolean, isLoanedOut: boolean }>;
    userCourthouseId?: IdType;
}

class ConnectedDutyRosterSheriffCard extends React.Component<ConnectedDutyRosterSheriffCardProps
    & ConnectedDutyRosterSheriffCardStateProps
    & ConnectedDutyRosterSheriffCardDispatchProps> {

    getShiftDisplayForDate(date: TimeType): { shiftTime: string, workSectionId?: WorkSectionCode } {
        const { shifts, userCourthouseId } = this.props;
        const shiftsForDay =
            shifts.filter(s => s.courthouseId == userCourthouseId)
                .filter(s => moment(date).isSame(s.startDateTime, 'day'));
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
        const {
            visibleTimeStart,
            sheriff,
            sheriff: { id, currentCourthouseId = '' },
            // tslint:disable-next-line:no-shadowed-variable
            sheriffLoanMap = {}
        } = this.props;
        const { shiftTime, workSectionId } = this.getShiftDisplayForDate(moment(visibleTimeStart).toISOString());
        const hasShift = shiftTime != '';
        const { isLoanedIn, isLoanedOut } = sheriffLoanMap[id];
        const showShiftLoanDetails = isLoanedIn || isLoanedOut || hasShift;
        return (
            <SheriffListCard sheriff={sheriff} disabled={!hasShift} >
                <div
                    style={{
                        fontSize: 14,
                        fontWeight: 'bold'
                    }}
                >

                    {showShiftLoanDetails && <div style={{ marginTop: 8 }}>
                        {isLoanedIn && <SheriffLoanInIcon />}
                        {isLoanedOut && <SheriffLoanOutIcon />}
                        <span style={{ marginLeft: 8, position: 'relative', bottom: 8 }}>
                            {!isLoanedOut && shiftTime}
                            {isLoanedOut && <CourthouseDisplay id={currentCourthouseId} />}
                        </span>
                    </div>}

                    {hasShift &&
                        <WorkSectionIndicator workSectionId={workSectionId} orientation={'bottom-right'} />}
                </div>
            </SheriffListCard>
        );
    }

}

const mapStateToProps = (state: RootState, { sheriff }: ConnectedDutyRosterSheriffCardProps) => {
    return {
        shifts: getSheriffShifts(sheriff.id)(state),
        visibleTimeStart: visibleTime(state).visibleTimeStart,
        sheriffLoanMap: sheriffLoanMap(state),
        userCourthouseId: userCourthouse(state)
    };
};

const mapDispatchToProps = {
    fetchShifts: getShifts,
};

// tslint:disable-next-line:max-line-length
export default connect<ConnectedDutyRosterSheriffCardStateProps, ConnectedDutyRosterSheriffCardDispatchProps, ConnectedDutyRosterSheriffCardProps>(
    mapStateToProps, mapDispatchToProps)(ConnectedDutyRosterSheriffCard);