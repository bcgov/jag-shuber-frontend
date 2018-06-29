import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { IdType } from '../api';
import { updateCurrentCourthouse } from '../modules/user/actions';
import { currentCourthouse as currentCourthouseSelector } from '../modules/user/selectors';
import CourthouseSelector from './CourthouseSelector';

interface CourthouseListStateProps {
    currentCourthouse: IdType;
}

interface CurrentCourthouseSelectorDispatchProps {
    updateCurrentCourthouseId?: (id: IdType) => void;
}

interface CurrentCourthouseSelectorProps {
}

class CurrentCourthouseSelector extends React.PureComponent<
    CurrentCourthouseSelectorProps & CourthouseListStateProps & CurrentCourthouseSelectorDispatchProps> {

    private onChange(courthouseId: string) {
        const { updateCurrentCourthouseId } = this.props;
        
        if (updateCurrentCourthouseId) {
            updateCurrentCourthouseId(courthouseId);
        }
    }

    render() {
        const { currentCourthouse = '' } = this.props;
        return (
            <CourthouseSelector value={currentCourthouse} onChange={(v) => this.onChange(v)} />
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        currentCourthouse: currentCourthouseSelector(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<CourthouseListStateProps, CurrentCourthouseSelectorDispatchProps, CurrentCourthouseSelectorProps>(
    mapStateToProps,
    {
        updateCurrentCourthouseId: updateCurrentCourthouse
    }
)(CurrentCourthouseSelector);