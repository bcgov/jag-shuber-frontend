import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { 
    SheriffRank, 
    IdType 
} from '../api/Api';
import { allSheriffRankCodes } from '../modules/courthouse/selectors';

interface SheriffRankDisplayListStateProps {
    sheriffRank: SheriffRank[];
}

interface SheriffRankDisplayListProps {
    code: IdType;
}

class SheriffRankDisplay extends React.PureComponent<
    SheriffRankDisplayListProps & SheriffRankDisplayListStateProps> {

    render() {
        const { sheriffRank = [], code } = this.props;
        return (
               code ? sheriffRank[code].description : 'not selected'
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        sheriffRank: allSheriffRankCodes(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<SheriffRankDisplayListStateProps, {}, SheriffRankDisplayListProps>(
    mapStateToProps
)(SheriffRankDisplay);