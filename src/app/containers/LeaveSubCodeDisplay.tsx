import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    LeaveSubCode
} from '../api/Api';
import { allLeaveSubCodes } from '../modules/leaves/selectors';

interface LeaveSubCodeDisplayStateProps {
    leaveSubCodes?: LeaveSubCode[];
}

interface LeaveSubCodeDisplayProps {
    subCode?: string;
}

class LeaveSubCodeDisplay extends React.PureComponent<
LeaveSubCodeDisplayProps & LeaveSubCodeDisplayStateProps> {

    render() {
        const { subCode, leaveSubCodes = []} = this.props;
        const leaveWithSubCode = leaveSubCodes.find(sc => sc.subCode === subCode);
        const displayValue = leaveWithSubCode ? leaveWithSubCode.description : 'not selected';
        return (
           displayValue
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        leaveSubCodes: allLeaveSubCodes(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<LeaveSubCodeDisplayStateProps, {}, LeaveSubCodeDisplayProps, RootState>(
    mapStateToProps,
    {}
)(LeaveSubCodeDisplay);