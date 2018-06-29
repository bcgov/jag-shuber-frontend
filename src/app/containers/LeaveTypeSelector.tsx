import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
// import { StringMap } from '../api/index';
// import { allCourthouses } from '../modules/courthouse/selectors';
import Selector, { SelectorProps } from '../components/FormElements/Selector';
import { LeaveTypeCode } from '../api/Api';

interface LeaveTypeSelectorStateProps {
    leaveTypes?: LeaveTypeCode[];
}

class LeaveTypeSelector extends React.PureComponent<
    LeaveTypeSelectorStateProps & SelectorProps> {

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
            <Selector {...restProps} data={selectorValues} />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        //courthouses: allCourthouses(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<LeaveTypeSelectorStateProps, {}, SelectorProps>(
    mapStateToProps
)(LeaveTypeSelector);