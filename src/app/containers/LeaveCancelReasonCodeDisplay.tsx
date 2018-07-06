import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    LeaveCancelCode
} from '../api/Api';
import { allLeaveCancelCodes } from '../modules/leaves/selectors';

interface LeaveSubCodeDisplayStateProps {
    cancelCodes?: LeaveCancelCode[];
}

interface LeaveSubCodeDisplayProps {
    code?: string;
}

class LeaveSubCodeDisplay extends React.PureComponent<
LeaveSubCodeDisplayProps & LeaveSubCodeDisplayStateProps> {

    render() {
        const { code, cancelCodes = []} = this.props;
        const reasonWithCode = cancelCodes.find(c => c.code === code);
        const displayValue = reasonWithCode ? reasonWithCode.description : 'not selected';
        return (
           displayValue
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        cancelCodes: allLeaveCancelCodes(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<LeaveSubCodeDisplayStateProps, {}, LeaveSubCodeDisplayProps, RootState>(
    mapStateToProps,
    {}
)(LeaveSubCodeDisplay);