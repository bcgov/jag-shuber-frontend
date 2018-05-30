import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    Courthouse,
    IdType
} from '../api/Api';
import { courthouseById } from '../modules/courthouse/selectors';

interface CourthouseDisplayListStateProps {
    courthouse?: Courthouse;
}

interface CourthouseDisplayListProps {
    id: IdType;
}

class CourthouseDisplay extends React.PureComponent<
    CourthouseDisplayListProps & CourthouseDisplayListStateProps> {

    render() {
        const { courthouse } = this.props;
        return (
            courthouse ? courthouse.name : 'not selected'
        );
    }
}

// tslint:disable-next-line:max-line-length
export default connect<CourthouseDisplayListStateProps, {}, CourthouseDisplayListProps, RootState>(
    (state, { id }) => ({
        courthouse: courthouseById(id)(state)
    })
)(CourthouseDisplay);