import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    SheriffRank,
    IdType
} from '../api/Api';
import { getSheriffRankByCode } from '../modules/sheriffs/selectors';

interface SheriffRankDisplayListStateProps {
    sheriffRank?: SheriffRank;
}

interface SheriffRankDisplayListProps {
    code: IdType;
}

class SheriffRankDisplay extends React.PureComponent<
    SheriffRankDisplayListProps & SheriffRankDisplayListStateProps> {

    render() {
        const { sheriffRank, code } = this.props;
        return (
            code ? (sheriffRank ? sheriffRank.description : `Unknown Rank '${code}'`) : 'Not Specified'
        );
    }
}

// tslint:disable-next-line:max-line-length
export default connect<SheriffRankDisplayListStateProps, {}, SheriffRankDisplayListProps, RootState>(
    (state, { code }) => ({
        sheriffRank: getSheriffRankByCode(code)(state)
    })
)(SheriffRankDisplay);
