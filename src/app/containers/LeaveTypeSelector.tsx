import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
// import { StringMap } from '../api/index';
// import { allCourthouses } from '../modules/courthouse/selectors';
import { FormFieldWrapperProps } from '../components/FormElements/FormFieldWrapper';
import Selector from '../components/FormElements/Selector';
import { LeaveTypeCode } from '../api/Api';

interface LeaveTypeSelectorStateProps {
    // leaveTypes?: LeaveType[];
}

export interface LeaveTypeSelectorProps extends FormFieldWrapperProps {
    leaveTypes?: LeaveTypeCode[];
}

class LeaveTypeSelector extends React.PureComponent<
    LeaveTypeSelectorStateProps & LeaveTypeSelectorProps> {

    render() {
        const { 
            leaveTypes = [
                {code: 'STIP', description: 'STIP'},
                {code: 'AL', description: 'Annual Leave'},
                {code: 'SL', description: 'Special Leave'},
            ], 
            ...restProps 
        } = this.props;
        const selectorValues = leaveTypes.map(leave => ({ key: leave.code, value: leave.description }));
        return (
            <Selector {...restProps} data={selectorValues} showLabel={false} />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        //courthouses: allCourthouses(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<LeaveTypeSelectorStateProps, {}, LeaveTypeSelectorProps>(
    mapStateToProps
)(LeaveTypeSelector);