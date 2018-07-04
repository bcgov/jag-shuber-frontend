import { connect } from 'react-redux';
import LeaveDisplay, { LeavesDisplayProps } from '../components/LeavesDisplay';
import { IdType } from '../api';
import { getSheriffFullDayLeaves, getSheriffPartialLeaves } from '../modules/leaves/selectors';
import { RootState } from '../store';

export interface SheriffLeaveDisplayProps {
    sheriffId: IdType;
}
export interface SheriffLeaveDisplayStateProps extends LeavesDisplayProps {
}
export interface SheriffLeaveDisplayDispatchProps {
}

// tslint:disable-next-line:max-line-length
export default connect<SheriffLeaveDisplayStateProps, SheriffLeaveDisplayDispatchProps, SheriffLeaveDisplayProps, RootState>
    (
    (state, { sheriffId }) => {
        return {
            fullDays: getSheriffFullDayLeaves(sheriffId)(state),
            partialDays: getSheriffPartialLeaves(sheriffId)(state) 
        };
    },
    {

    },
)(LeaveDisplay);