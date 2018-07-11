import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { getAllTrainingLeaveSubCodes } from '../modules/leaves/selectors';
import Selector, { SelectorProps } from '../components/FormElements/Selector';
import { LeaveSubCode } from '../api/Api';

interface TrainingLeaveSubCodeSelectorStateProps {
    trainingLeaveSubCodes?: LeaveSubCode[];
}

class PersonalLeaveSubCodeSelector extends React.PureComponent<
    TrainingLeaveSubCodeSelectorStateProps & SelectorProps> {

    render() {
        const { 
            trainingLeaveSubCodes = [], 
            ...restProps 
        } = this.props;
        const selectorValues = trainingLeaveSubCodes.map(leave => ({ key: leave.subCode, value: leave.description }));
        return (
            <Selector {...restProps} data={selectorValues} />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        trainingLeaveSubCodes: getAllTrainingLeaveSubCodes(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<TrainingLeaveSubCodeSelectorStateProps, {}, SelectorProps>(
    mapStateToProps
)(PersonalLeaveSubCodeSelector);