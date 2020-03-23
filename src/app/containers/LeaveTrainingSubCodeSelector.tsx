import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { allEffectiveTrainingLeaveSubCodes } from '../modules/leaves/selectors';
import Selector, { SelectorProps } from '../components/FormElements/Selector';
import { LeaveSubCode } from '../api/Api';

interface TrainingLeaveSubCodeSelectorStateProps {
    trainingLeaveSubCodes?: LeaveSubCode[];
}

// Sort by sort order, we can make this configurable later if necessary
const sortByOrder = (a: any, b: any) => {
    if (a.hasOwnProperty('sortOrder') && b.hasOwnProperty('sortOrder')) {
        if (a.sortOrder < b.sortOrder) {
            return -1;
        } else if (b.sortOrder < a.sortOrder) {
            return 1;
        }
    }

    return 0;
};

class TrainingLeaveSubCodeSelector extends React.PureComponent<
    TrainingLeaveSubCodeSelectorStateProps & SelectorProps> {

    render() {
        const {
            trainingLeaveSubCodes = [],
            ...restProps
        } = this.props;

        trainingLeaveSubCodes.sort(sortByOrder);

        const selectorValues = trainingLeaveSubCodes.map(leave => ({ key: leave.subCode, value: leave.description }));
        return (
            <Selector {...restProps} data={selectorValues} />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        trainingLeaveSubCodes: allEffectiveTrainingLeaveSubCodes()(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<TrainingLeaveSubCodeSelectorStateProps, {}, SelectorProps>(
    mapStateToProps
)(TrainingLeaveSubCodeSelector);
