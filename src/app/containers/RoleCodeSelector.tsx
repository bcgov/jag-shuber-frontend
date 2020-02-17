import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { allEffectiveTrainingLeaveSubCodes } from '../modules/leaves/selectors';
import Selector, { SelectorProps } from '../components/FormElements/Selector';
import { LeaveSubCode } from '../api/Api';

interface RoleCodeSelectorStateProps {
    roleCodes?: LeaveSubCode[];
}

class RoleCodeSelector extends React.PureComponent<
    RoleCodeSelectorStateProps & SelectorProps> {

    render() {
        const {
            roleCodes = [],
            ...restProps
        } = this.props;
        const selectorValues = roleCodes.map(role => ({ key: role.id as string, value: role.description }));
        return (
            <Selector {...restProps} data={selectorValues} />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        roleCodes: allEffectiveTrainingLeaveSubCodes()(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<RoleCodeSelectorStateProps, {}, SelectorProps>(
    mapStateToProps
)(RoleCodeSelector);
