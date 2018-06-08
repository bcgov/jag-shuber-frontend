import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
// import { StringMap } from '../api/index';
// import { allCourthouses } from '../modules/courthouse/selectors';
import { FormFieldWrapperProps } from '../components/FormElements/FormFieldWrapper';
import Selector from '../components/FormElements/Selector';
import { LeaveCancelCode } from '../api/Api';

interface LeaveTypeSelectorStateProps {
    // leaveTypes?: LeaveType[];
}

export interface LeaveTypeSelectorProps extends FormFieldWrapperProps {
    cancelTypes?: LeaveCancelCode[];
}

class LeaveTypeSelector extends React.PureComponent<
    LeaveTypeSelectorStateProps & LeaveTypeSelectorProps> {

    render() {
        const { 
            cancelTypes = [
                {code: 'OPD', description: 'Cover Opperational Demands'},
                {code: 'PD', description: 'Personal Decision'},
                {code: 'ER', description: 'Entry Error'},
            ], 
            ...restProps 
        } = this.props;
        const selectorValues = cancelTypes.map(leave => ({ key: leave.code, value: `Cancel - ${leave.description}` }));
        return (
            <Selector {...restProps} data={selectorValues} showLabel={false} allowNone={true} noneLabel="Confirmed" />
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