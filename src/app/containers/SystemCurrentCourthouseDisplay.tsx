import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    Courthouse,
    IdType
} from '../api/Api';
import { courthouseById } from '../modules/system/selectors';
import { currentCourthouse } from '../modules/user/selectors';

interface CurrentCourthouseDisplayStateProps {
    courthouse?: Courthouse;
}

interface CurrentCourthouseDisplayDispatchProps {
}

interface CurrentCourthouseDisplayProps {
    id?: IdType;
}

class CurrentCourthouseDisplay extends React.PureComponent<
    CurrentCourthouseDisplayProps & CurrentCourthouseDisplayStateProps & CurrentCourthouseDisplayDispatchProps> {

    render() {
        const { courthouse } = this.props;
        return (
            <span>
                {courthouse ? courthouse.name : 'not selected'}
            </span>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    const currentId = currentCourthouse(state);
    return {
        id: currentId,
        courthouse: courthouseById(currentId)(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<CurrentCourthouseDisplayStateProps, CurrentCourthouseDisplayDispatchProps, CurrentCourthouseDisplayProps, RootState>(
    mapStateToProps,
    {}
)(CurrentCourthouseDisplay);