import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    LeaveSubCode
} from '../api/Api';
import { allLeavesSubCodeMap } from '../modules/leaves/selectors';

interface RoleCodeDisplayStateProps {
    roleCode?: LeaveSubCode;
}

interface RoleCodeDisplayProps {
    roleCode?: string;
}

class RoleCodeDisplay extends React.PureComponent<
    RoleCodeDisplayProps & RoleCodeDisplayStateProps> {

    render() {
        const { roleCode } = this.props;
        const displayValue = roleCode ? roleCode.description : 'not selected';
        return (
            displayValue
        );
    }
}

// tslint:disable-next-line:max-line-length
export default connect<RoleCodeDisplayStateProps, {}, RoleCodeDisplayProps, RootState>(
    (state: RootState, {roleCode}) => {
        return {
            roleCode: roleCode ? allLeavesSubCodeMap(state)[roleCode] : undefined
        };
    },
    {}
)(RoleCodeDisplay);
