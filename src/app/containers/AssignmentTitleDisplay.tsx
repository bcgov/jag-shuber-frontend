import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    Assignment
} from '../api/Api';
import { getAssignment } from '../modules/assignments/selectors';

interface AssignmentTitleDisplayStateProps {
    assignment?: Assignment;
}

interface AssignmentTitleDisplayProps {
    id?: string;
}

class AssignmentTitleDisplay extends React.PureComponent<
    AssignmentTitleDisplayProps & AssignmentTitleDisplayStateProps> {

    render() {
        const { assignment } = this.props;
        const displayValue = assignment ? assignment.title : '';
        return (
            displayValue
        );
    }
}

// tslint:disable-next-line:max-line-length
export default connect<AssignmentTitleDisplayStateProps, {}, AssignmentTitleDisplayProps, RootState>(
    (state, { id }) => {
        return {
            assignment: id ? getAssignment(id)(state) : undefined
        };
    },
    {}
)(AssignmentTitleDisplay);