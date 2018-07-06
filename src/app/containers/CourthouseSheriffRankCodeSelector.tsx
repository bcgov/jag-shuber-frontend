import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { SheriffRank } from '../api/Api';
import { allSheriffRankCodes } from '../modules/courthouse/selectors';
import Selector, { SelectorProps } from '../components/FormElements/Selector';

interface CourthouseSheriffRankListStateProps {
    sheriffRanks: SheriffRank[];
}

class CourthouseSheriffRankList extends React.PureComponent<
    SelectorProps & CourthouseSheriffRankListStateProps> {

    render() {
        const { sheriffRanks = [], label = 'Rank', ...restProps } = this.props;
        const selectorValues = sheriffRanks.map(rank => ({ key: rank.code, value: rank.description }));
        return (
            <Selector 
                data={selectorValues}
                label={label}
                {...restProps} 
            />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        sheriffRanks: allSheriffRankCodes(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<CourthouseSheriffRankListStateProps, {}, SelectorProps>(
    mapStateToProps
)(CourthouseSheriffRankList);