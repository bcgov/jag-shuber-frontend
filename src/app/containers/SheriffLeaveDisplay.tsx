import { connect } from 'react-redux';
import LeaveDisplay, { LeavesDisplayProps } from '../components/LeavesDisplay';
import { IdType } from '../api';
import { getSheriffLeaves } from '../modules/leaves/selectors';
import { RootState } from '../store';

export interface SheriffLeaveDisplayProps {
    sheriffId: IdType;
}
export interface SheriffLeaveDisplayStateProps extends LeavesDisplayProps {
}
export interface SheriffLeaveDisplayDispatchProps {
}

export default connect<SheriffLeaveDisplayStateProps, SheriffLeaveDisplayDispatchProps, SheriffLeaveDisplayProps, RootState>
    (
    (state, { sheriffId }) => {
        return {
            leaves: getSheriffLeaves(sheriffId)(state)
        };
    },
    {

    },
)(LeaveDisplay);