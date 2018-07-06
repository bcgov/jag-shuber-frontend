import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    LeaveSubCode
} from '../api/Api';
import { allLeavesSubCodeMap } from '../modules/leaves/selectors';

interface LeaveSubCodeDisplayStateProps {
    leaveSubCode?: LeaveSubCode;
}

interface LeaveSubCodeDisplayProps {
    subCode?: string;
}

class LeaveSubCodeDisplay extends React.PureComponent<
    LeaveSubCodeDisplayProps & LeaveSubCodeDisplayStateProps> {

    render() {
        const { leaveSubCode } = this.props;
        const displayValue = leaveSubCode ? leaveSubCode.description : 'not selected';
        return (
            displayValue
        );
    }
}

// tslint:disable-next-line:max-line-length
export default connect<LeaveSubCodeDisplayStateProps, {}, LeaveSubCodeDisplayProps, RootState>(
    (state: RootState, {subCode}) => {
        return {
            leaveSubCode: subCode ? allLeavesSubCodeMap(state)[subCode] : undefined
        };
    },
    {}
)(LeaveSubCodeDisplay);