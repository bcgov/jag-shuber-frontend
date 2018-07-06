import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { getAllPersonalLeaveSubCodes } from '../modules/leaves/selectors';
import Selector, { SelectorProps } from '../components/FormElements/Selector';
import { LeaveSubCode } from '../api/Api';

interface PersonalLeaveSubCodeSelectorStateProps {
    personalLeaveSubCodes?: LeaveSubCode[];
}

class PersonalLeaveSubCodeSelector extends React.PureComponent<
    PersonalLeaveSubCodeSelectorStateProps & SelectorProps> {

    render() {
        const { 
            personalLeaveSubCodes = [
                {code: 'PERSONAL', subCode: 'STIP', description: 'STIP'},
                {code: 'PERSONAL', subCode: 'AL', description: 'Annual Leave'},
                {code: 'PERSONAL', subCode: 'SL', description: 'Special Leave'},
            ], 
            ...restProps 
        } = this.props;
        const selectorValues = personalLeaveSubCodes.map(leave => ({ key: leave.subCode, value: leave.description }));
        return (
            <Selector {...restProps} data={selectorValues} />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        personalLeaveSubCodes: getAllPersonalLeaveSubCodes(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<PersonalLeaveSubCodeSelectorStateProps, {}, SelectorProps>(
    mapStateToProps
)(PersonalLeaveSubCodeSelector);