import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    Sheriff,
    IdType
} from '../api/Api';
import { getSheriff } from '../modules/sheriffs/selectors';
import toTitleCase from '../infrastructure/toTitleCase';

interface SheriffNameDisplayListStateProps {
    sheriff?: Sheriff;
}

interface SheriffNameDisplayListProps {
    id: IdType;
}

class SheriffNameDisplay extends React.PureComponent<
    SheriffNameDisplayListProps & SheriffNameDisplayListStateProps> {

    render() {
        const { sheriff } = this.props;
        return (
            sheriff ? `${toTitleCase(sheriff.firstName)} ${toTitleCase(sheriff.lastName)}` : 'sheriff'
        );
    }
}

// tslint:disable-next-line:max-line-length
export default connect<SheriffNameDisplayListStateProps, {}, SheriffNameDisplayListProps, RootState>(
    (state, { id }) => ({
        sheriff: getSheriff(id)(state)
    })
)(SheriffNameDisplay);