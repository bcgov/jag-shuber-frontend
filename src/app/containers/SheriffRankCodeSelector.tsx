import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { SheriffRank } from '../api/Api';
import { allEffectiveSheriffRankCodes } from '../modules/sheriffs/selectors';
import Selector, { SelectorProps } from '../components/FormElements/Selector';

interface SheriffRankListStateProps {
    sheriffRanks: SheriffRank[];
}

class SheriffRankList extends React.PureComponent<
    SelectorProps & SheriffRankListStateProps> {

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
        sheriffRanks: allEffectiveSheriffRankCodes()(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<SheriffRankListStateProps, {}, SelectorProps>(
    mapStateToProps
)(SheriffRankList);