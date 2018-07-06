import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    LeaveCancelCode
} from '../api/Api';
import { cancelReasonCodesMap } from '../modules/leaves/selectors';

interface LeaveSubCodeDisplayStateProps {
    cancelCode?: LeaveCancelCode;
}

interface LeaveSubCodeDisplayProps {
    code?: string;
}

class LeaveSubCodeDisplay extends React.PureComponent<
    LeaveSubCodeDisplayProps & LeaveSubCodeDisplayStateProps> {

    render() {
        const { cancelCode } = this.props;
        const displayValue = cancelCode ? cancelCode.description : 'not selected';
        return (
            displayValue
        );
    }
}

// tslint:disable-next-line:max-line-length
export default connect<LeaveSubCodeDisplayStateProps, {}, LeaveSubCodeDisplayProps, RootState>(
    (state, { code }) => {
        return {
            cancelCode: code ? cancelReasonCodesMap(state)[code] : undefined
        };
    },
    {}
)(LeaveSubCodeDisplay);